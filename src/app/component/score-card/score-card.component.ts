import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscriber, Subscription } from 'rxjs';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.sass']
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  private fPlayer: Player|null=this.playersService.empty;
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
  @Input() public displayNameProvider: DisplayNameProvider=new DisplayNameProvider(false, []);
  
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
      this.backgroundColor$.next(player.backgroundColor);
      this.color$.next(player.color);
    }
    else
    {
      this.backgroundColor$.next("");
      this.color$.next("");
    }
    this.displayName$.next(this.displayNameProvider.get(player));
  }

}
