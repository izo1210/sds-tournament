import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/services/current-game/current-game.service';
import { PlayersService } from 'src/app/services/players/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

@Component({
  selector: 'app-select-first-player',
  templateUrl: './select-first-player.component.html',
  styleUrls: ['./select-first-player.component.sass']
})
export class SelectFirstPlayerComponent implements OnInit {
  public playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider(this.currentGameService.getPlayers());

  constructor(
    public playersService: PlayersService,
    public currentGameService: CurrentGameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  selectPlayer(player: Player)
  {
    this.currentGameService.start(player);
    Paths.get.play.navigate(this.router);
  }

  back()
  {
    Paths.get.newRight.navigate(this.router);
  }

}
