import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Player } from '../../model/player';
import { CurrentGameService } from '../../services/current-game/current-game.service';
import { PlayersService } from '../../services/players/players.service';
import { PlayerPropertyProvider } from '../../common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.sass']
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  private fPlayer: Player|null=Player.empty;
  @Input() public set player(newPlayer: Player|null) 
  { 
    this.fPlayer=newPlayer;
    this.onDataChange();
  }
  public get player(): Player|null
  {
    return this.fPlayer;
  }

  @Input() public score: number|null=0;
  @Input() public playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);
  @Input() public secondary: boolean=false;
  
  public readonly backgroundColor$: BehaviorSubject<string>=new BehaviorSubject<string>("");
  public readonly color$: BehaviorSubject<string>=new BehaviorSubject<string>("");
  public readonly displayName$: BehaviorSubject<string>=new BehaviorSubject<string>("");

  private readonly subscriptionToServerPlayer: Subscription=this.currentGameService.serverPlayer$.subscribe(serverPlayer=>this.onDataChange());

  constructor(
    private playersService: PlayersService,
    private currentGameService: CurrentGameService
  ) { }

  ngOnInit(): void {    
  }

  ngOnDestroy(): void {
    this.subscriptionToServerPlayer.unsubscribe();
  }

  onDataChange()
  {
    const player: Player|null=this.player;
    const serverPlayer: Player=this.currentGameService.serverPlayer$.getValue();
    if(serverPlayer===player)
    {
      this.backgroundColor$.next(this.playerPropertyProvider.getBackgroundColor(player, this.secondary));
      this.color$.next(this.playerPropertyProvider.getColor(player, this.secondary));
    }
    else
    {
      this.backgroundColor$.next("");
      this.color$.next("");
    }
    this.displayName$.next(this.playerPropertyProvider.getDisplayName(player));
  }

}
