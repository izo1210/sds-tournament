import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-select-left-player',
  templateUrl: './select-left-player.component.html',
  styleUrls: ['./select-left-player.component.sass']
})
export class SelectLeftPlayerComponent implements OnInit, OnDestroy {
  public readonly displayNameProvider: DisplayNameProvider=new DisplayNameProvider(true, []);

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
        this.router.navigate(["/current-game"]);
      }
    }

    this.displayNameProvider.subscribeToPlayers(this.playersService.playerList$);
  }

  ngOnDestroy(): void 
  {
    this.displayNameProvider.unsubscribeFromPlayers();
  }

  selectPlayer(player: Player)
  {
    this.currentGameService.reset();
    this.currentGameService.leftPlayer=player;
    this.router.navigate(["/select-right-player"]);
  }

}
