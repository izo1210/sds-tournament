import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-select-first-player',
  templateUrl: './select-first-player.component.html',
  styleUrls: ['./select-first-player.component.sass']
})
export class SelectFirstPlayerComponent implements OnInit {
  public displayNameProvider: DisplayNameProvider=new DisplayNameProvider(false, this.currentGameService.getPlayers());

  constructor(
    public playersService: PlayersService,
    public currentGameService: CurrentGameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.currentGameService.leftPlayer===this.playersService.empty)
    {
      this.router.navigate(["/select-right-player"]);
    }
  }

  selectPlayer(player: Player)
  {
    this.currentGameService.start(player);
    this.router.navigate(["/current-game"]);
  }

}
