import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { PlayersService } from 'src/app/services/players/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-manage-players',
  templateUrl: './manage-players.component.html',
  styleUrls: ['./manage-players.component.sass']
})
export class ManagePlayersComponent implements OnInit {
  constructor(
    public playersService: PlayersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get playerPropertyProvider(): PlayerPropertyProvider
  {
    return this.playersService.defaultPlayerPropertyProvider;
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
