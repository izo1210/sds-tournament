import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import { GamesService } from 'src/app/service/games/games.service';
import { PlayersService } from 'src/app/service/players.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.sass']
})
export class GameCardComponent implements OnInit {
  @Input() public game: Game=this.gamesService.empty;

  constructor(
    private gamesService: GamesService,
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
  }

  displayName(playerId: string)
  {
    return playerId;
  } 

}
