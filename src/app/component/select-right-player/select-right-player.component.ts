import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-select-right-player',
  templateUrl: './select-right-player.component.html',
  styleUrls: ['./select-right-player.component.sass']
})
export class SelectRightPlayerComponent implements OnInit, OnDestroy {
  public readonly displayNameProvider: DisplayNameProvider=new DisplayNameProvider(true, []);

  constructor(
    public playersService: PlayersService,
    public currentGameService: CurrentGameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.currentGameService.leftPlayer===this.playersService.empty)
    {
      this.router.navigate(["/select-left-player"]);
    }

    this.displayNameProvider.subscribeToPlayers(this.playersService.playerList$);
  }

  ngOnDestroy(): void 
  {
    this.displayNameProvider.unsubscribeFromPlayers();
  }

  selectPlayer(player: Player)
  {
    this.currentGameService.rightPlayer=player;
    this.router.navigate(["/select-first-player"]);
  }

  changeLeftPlayer()
  {
    this.router.navigate(["/select-left-player"]);
  }

}
