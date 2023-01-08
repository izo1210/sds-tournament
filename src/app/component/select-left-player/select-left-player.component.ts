import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-select-left-player',
  templateUrl: './select-left-player.component.html',
  styleUrls: ['./select-left-player.component.sass']
})
export class SelectLeftPlayerComponent implements OnInit, OnDestroy {
  public readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);

  constructor(
    public playersService: PlayersService,
    private currentGameService: CurrentGameService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    if(this.currentGameService.state$.value==this.currentGameService.stateFinished() || this.currentGameService.state$.value==this.currentGameService.stateInProgress())
    {
      if(!confirm("Current game is not saved. Do you want to start new game?"))
      {
        Paths.get.play.navigate(this.router);
      }
    }

    this.playerPropertyProvider.subscribeToPlayers(this.playersService.playerList$);
  }

  ngOnDestroy(): void 
  {
    this.playerPropertyProvider.unsubscribeFromPlayers();
  }

  selectPlayer(player: Player): void
  {
    this.currentGameService.reset();
    this.currentGameService.leftPlayer=player;
    Paths.get.newRight.navigate(this.router);
  }

  addPlayer(): void
  {
    Paths.get.player.navigate(this.router); 
  }

}
