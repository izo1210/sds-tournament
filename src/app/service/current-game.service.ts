import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { PlayerPropertyProvider } from '../common/player-property-provider/player-property-provider';
import { History } from '../util/history/history';
import { GamesService } from './games/games.service';
import { PlayersService } from './players.service';
import { PropertiesService } from './properties.service';
import { SpeakerService } from './speaker/speaker.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  static readonly STATE_NOT_READY=-1;
  static readonly STATE_IN_PROGRESS=0;
  static readonly STATE_FINISHED=1;
  static readonly STATE_SAVED=2;

  leftPlayer: Player=this.playersService.empty;
  rightPlayer: Player=this.playersService.empty;
  private firstPlayer: Player=this.playersService.empty;
  private secondPlayer: Player=this.playersService.empty;
  readonly leftScore$: BehaviorSubject<number>=new BehaviorSubject<number>(0);
  readonly rightScore$: BehaviorSubject<number>=new BehaviorSubject<number>(0);
  readonly serverPlayer$: BehaviorSubject<Player>=new BehaviorSubject<Player>(this.playersService.empty);
  readonly state$: BehaviorSubject<number>=new BehaviorSubject<number>(CurrentGameService.STATE_NOT_READY);
  readonly history: History=new History();
  readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);
  
  constructor(
    private playersService: PlayersService,
    private gamesService: GamesService,
    private propertiesService: PropertiesService,
    private speakerService: SpeakerService
  ) 
  { 
    this.leftScore$.subscribe(score=>this.setState());
    this.rightScore$.subscribe(score=>this.setState());
  }

  reset()
  {
    this.history.clear();
    this.leftPlayer=this.playersService.empty;
    this.rightPlayer=this.playersService.empty;
    this.firstPlayer=this.playersService.empty;
    this.secondPlayer=this.playersService.empty;
    this.serverPlayer$.next(this.playersService.empty);
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
    this.serverPlayer$.next(this.playersService.empty);
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
    if(this.rightPlayer===this.playersService.empty || this.rightPlayer===this.playersService.empty)
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
    return this.playersService.empty;
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
    const game: Game={
      leftPlayer: this.leftPlayer.id,
      leftScore: this.leftScore$.value,
      rightPlayer: this.rightPlayer.id,
      rightScore: this.rightScore$.value,
      timestamp: new Date().toISOString()
    };

    this.gamesService
      .save(game.timestamp, game)
      .then(()=>{
        this.state$.next(this.stateSaved());
        this.history.clear();
      })
      .catch(reason=>alert("Failed to save: "+reason));
  }

  getPlayers(): Player[]
  {
    const players: Player[]=[];
    if(this.leftPlayer!==this.playersService.empty)
    {
      players.push(this.leftPlayer);
    }
    if(this.rightPlayer!==this.playersService.empty)
    {
      players.push(this.rightPlayer);
    }
    return players;
  }

  private speakScores()
  {
    if(this.leftScore$.value===0 && this.rightScore$.value===0)
    {
      return;
    }
    let s=""+this.leftScore$.value+", "+this.rightScore$.value+".";
    if(s=="10, 6.")
    {
      s="10, 6, még bízhat.";
    }
    this.speakerService.speak(s);
  }

  private speakServerPlayer()
  {
    if(this.state$.value!==CurrentGameService.STATE_IN_PROGRESS)
    {
      return;
    }
    this.speakerService.speak(this.playerPropertyProvider.getDisplayName(this.serverPlayer$.value)+" szervál.");
  }

  private speakWinner()
  {
    if(this.state$.value!==CurrentGameService.STATE_FINISHED)
    {
      return;
    }
    this.speakerService.speak(this.playerPropertyProvider.getDisplayName(this.leader())+" nyert!");
  }

}
