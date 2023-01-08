import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-select-right-player',
  templateUrl: './select-right-player.component.html',
  styleUrls: ['./select-right-player.component.sass']
})
export class SelectRightPlayerComponent implements OnInit, OnDestroy {
  public readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);

  constructor(
    public playersService: PlayersService,
    public currentGameService: CurrentGameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.currentGameService.leftPlayer===this.playersService.empty)
    {
      Paths.get.newLeft.navigate(this.router);
    }

    this.playerPropertyProvider.subscribeToPlayers(this.playersService.playerList$);
  }

  ngOnDestroy(): void 
  {
    this.playerPropertyProvider.unsubscribeFromPlayers();
  }

  selectPlayer(player: Player|null)
  {
    if(player==null)
    {
      Paths.get.player.navigate(this.router);
    }
    else
    {
      this.currentGameService.rightPlayer=player;
      Paths.get.newFirst.navigate(this.router);
    }
  }

  back()
  {
    Paths.get.newLeft.navigate(this.router);
  }

}
