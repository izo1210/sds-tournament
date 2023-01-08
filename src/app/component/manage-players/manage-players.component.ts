import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.sass']
})
export class ManagePlayersComponent implements OnInit {
  public readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);

  constructor(
    public playersService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      Paths.get.player.navigate(this.router, {id: player.id});
    }
  }

}
