import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';
import { History } from 'src/app/util/history/history';
import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { SettingsService } from '../settings/settings.service';
import { SpeakerService } from '../speaker/speaker.service';
import { GamesService } from '../games/games.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  static readonly STATE_NOT_READY=-1;
  static readonly STATE_IN_PROGRESS=0;
  static readonly STATE_FINISHED=1;
  static readonly STATE_SAVED=2;

  leftPlayer: Player=Player.empty;
  rightPlayer: Player=Player.empty;
  private firstPlayer: Player=Player.empty;
  private secondPlayer: Player=Player.empty;
  readonly leftScore$: BehaviorSubject<number>=new BehaviorSubject<number>(0);
  readonly rightScore$: BehaviorSubject<number>=new BehaviorSubject<number>(0);
  readonly serverPlayer$: BehaviorSubject<Player>=new BehaviorSubject<Player>(Player.empty);
  readonly state$: BehaviorSubject<number>=new BehaviorSubject<number>(CurrentGameService.STATE_NOT_READY);
  readonly history: History=new History();
  readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);
  
  constructor(
    private gamesService: GamesService,
    private propertiesService: SettingsService,
    private speakerService: SpeakerService
  ) 
  { 
    this.leftScore$.subscribe(score=>this.setState());
    this.rightScore$.subscribe(score=>this.setState());
  }

  reset()
  {
    this.history.clear();
    this.leftPlayer=Player.empty;
    this.rightPlayer=Player.empty;
    this.firstPlayer=Player.empty;
    this.secondPlayer=Player.empty;
    this.serverPlayer$.next(Player.empty);
    this.leftScore$.next(0);
    this.rightScore$.next(0);
  }

  start(player: Player)
  {
    this.playerPropertyProvider.setPlayers(this.getPlayers());
    if(player===this.leftPlayer)
    {
      this.startLeft();
    }
    else
    {
      this.startRight();
    }
    this.setState();
  }
  
  private startLeft()
  {
    this.firstPlayer=this.leftPlayer;
    this.secondPlayer=this.rightPlayer;
  }

  private startRight()
  {
    this.firstPlayer=this.rightPlayer;
    this.secondPlayer=this.leftPlayer;
  }
  
  incrementLeftScore()
  {
    if(this.state$.value!==CurrentGameService.STATE_IN_PROGRESS)
    {
      return;
    }
    this.addToScore(this.leftScore$, 1);
    this.history.add(()=>this.decrementLeftScore());
    this.speakScores();
  }

  incrementRightScore()
  {
    if(this.state$.value!==CurrentGameService.STATE_IN_PROGRESS)
    {
      return;
    }
    this.addToScore(this.rightScore$, 1);
    this.history.add(()=>this.decrementRightScore());
    this.speakScores();
  }

  decrementLeftScore()
  {
    this.addToScore(this.leftScore$, -1);
  }

  decrementRightScore()
  {
    this.addToScore(this.rightScore$, -1);
  }

  private addToScore(score$: BehaviorSubject<number>, add: number)
  {
    this.setScore(score$, score$.value+add);
  }

  private setScore(score$: BehaviorSubject<number>, next: number)
  {
    score$.next(next);
  }

  private setServerPlayer()
  {
    switch(this.state$.value)
    {
      case CurrentGameService.STATE_IN_PROGRESS:
        this.setServerPlayerWhenInProgress();
        break;
      case CurrentGameService.STATE_FINISHED:
      case CurrentGameService.STATE_SAVED:
          this.setServerPlayerWhenFinished();
        break;
      default:
        this.setServerPlayerEmpty();
    }
  }

  private setServerPlayerEmpty()
  {
    this.serverPlayer$.next(Player.empty);
  }

  private setServerPlayerWhenInProgress()
  {
    const totalScore=this.leftScore$.value+this.rightScore$.value;
    const firstPlayerServes=(totalScore%(this.propertiesService.serveCount*2)<this.propertiesService.serveCount);

    let newServerPlayer=firstPlayerServes ? this.firstPlayer : this.secondPlayer;

    if(newServerPlayer!==this.serverPlayer$.value)
    {
      this.serverPlayer$.next(newServerPlayer);
      this.speakServerPlayer();
    }
  }

  private setServerPlayerWhenFinished()
  {
    this.serverPlayer$.next(this.leader());
  }

  private setState()
  { 
    const hasMissingPlayers=this.hasMissingPlayers();  
    const hasWon=this.hasWon();

    if(hasMissingPlayers && this.state$.value!==CurrentGameService.STATE_NOT_READY)
    {
      this.state$.next(CurrentGameService.STATE_NOT_READY);
    }
    else if(hasWon && this.state$.value<CurrentGameService.STATE_FINISHED)
    {
      this.state$.next(CurrentGameService.STATE_FINISHED);
      this.speakWinner();
    }
    else if(!hasWon && !hasMissingPlayers && this.state$.value!==CurrentGameService.STATE_IN_PROGRESS)
    {
      this.state$.next(CurrentGameService.STATE_IN_PROGRESS);
    }

    this.setServerPlayer();
  }

  private hasMissingPlayers(): boolean
  {
    if(this.rightPlayer===Player.empty || this.rightPlayer===Player.empty)
    {
      return true;
    }
    return false;
  }

  private hasWon(): boolean
  {
    const maxScore=Math.max(this.leftScore$.value, this.rightScore$.value);
    const minScore=Math.min(this.leftScore$.value, this.rightScore$.value);
    return maxScore>=this.propertiesService.winScore && maxScore-minScore>=this.propertiesService.winDiff;
  }

  leader(): Player
  {
    if(this.leftScore$.value>this.rightScore$.value)
    {
      return this.leftPlayer;
    }
    if(this.leftScore$.value<this.rightScore$.value)
    {
      return this.rightPlayer;
    }
    return Player.empty;
  }

  stateNotReady(): number
  {
    return CurrentGameService.STATE_NOT_READY; 
  }

  stateInProgress(): number
  {
    return CurrentGameService.STATE_IN_PROGRESS; 
  }

  stateFinished(): number
  {
    return CurrentGameService.STATE_FINISHED; 
  }

  stateSaved(): number
  {
    return CurrentGameService.STATE_SAVED;
  }

  save()
  {
    const leftWins=(this.leftScore$.value>this.rightScore$.value);
    const game: Game=new Game();
    game.winnerPlayerId=leftWins ? this.leftPlayer.id : this.rightPlayer.id;
    game.winnerScore=leftWins ? this.leftScore$.value : this.rightScore$.value;
    game.loserPlayerId=leftWins ? this.rightPlayer.id : this.leftPlayer.id;
    game.loserScore=leftWins ? this.rightScore$.value : this.leftScore$.value;

    this.gamesService
      .set(game.timestamp, game)
      .then(()=>{
        this.state$.next(this.stateSaved());
        this.history.clear();
      })
      .catch(reason=>alert("Failed to save: "+reason));
  }

  getPlayers(): Player[]
  {
    const players: Player[]=[];
    if(this.leftPlayer!==Player.empty)
    {
      players.push(this.leftPlayer);
    }
    if(this.rightPlayer!==Player.empty)
    {
      players.push(this.rightPlayer);
    }
    return players;
  }

  private speakScores()
  {
    if(this.leftScore$.value===0 && this.rightScore$.value===0) return;
    let text=""+this.leftScore$.value+", "+this.rightScore$.value+".";
    if(this.leftScore$.value==10 && this.rightScore$.value==6) text="10, 6, még bízhat.";
    setTimeout(()=>this.speakerService.speak(text), this.propertiesService.speakTimeout);
  }

  private speakServerPlayer()
  {
    if(this.state$.value!==CurrentGameService.STATE_IN_PROGRESS) return;
    let text=this.playerPropertyProvider.getDisplayName(this.serverPlayer$.value)+" szervál.";
    setTimeout(()=>this.speakerService.speak(text), this.propertiesService.speakTimeout+1000);
  }

  private speakWinner()
  {
    if(this.state$.value!==CurrentGameService.STATE_FINISHED) return;
    let text=this.playerPropertyProvider.getDisplayName(this.leader())+" nyert!";
    setTimeout(()=>this.speakerService.speak(text), this.propertiesService.speakTimeout+1000);
  }

}
