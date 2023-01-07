import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from 'src/app/model/game';
import { GameRow } from 'src/app/model/game/game-row';
import { Player } from 'src/app/model/player';
import { GamesService } from 'src/app/service/games/games.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit, OnDestroy {
  readonly displayedColumns: string[]=[
    "winnerPlayer",
    "winnerScore",
    "loserPlayer",
    "loserScore",
    "timestamp"
  ];

  readonly dataSource$=new BehaviorSubject<GameRow[]>([]);

  readonly displayNameProvider: DisplayNameProvider=new DisplayNameProvider(false, []);

  private playerMap: any={};

  private gamesSubscription: Subscription=this.gamesService.games$.subscribe(games=>this.refreshDataSource(games));
  private playersSubscription: Subscription=this.playersService.playerList$.subscribe(playerList=>this.fillPlayerMap(playerList));

  filterForm: FormGroup=new FormGroup({
    'from': new FormControl(""),
    'to': new FormControl("")
  });


  constructor(
    public gamesService: GamesService,
    public playersService: PlayersService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.playersSubscription.unsubscribe(); 
    this.gamesSubscription.unsubscribe();
  }

  private fillPlayerMap(playerList: Player[])
  {
    this.playerMap={};
    playerList.forEach(player=>this.playerMap[player.id]=player);
    this.displayNameProvider.setPlayers(Object.values(this.playerMap));
  }

  private refreshDataSource(games: Game[])
  {
    const gameRows: GameRow[]=[];
    for(let game of games)
    {
      const leftPlayer=this.getPlayer(game.leftPlayer);
      const rightPlayer=this.getPlayer(game.rightPlayer);
      if(game.leftScore>game.rightScore)
      {
        const gameRow: GameRow={
          winnerPlayer: leftPlayer,
          winnerScore: game.leftScore,
          winnerDisplayName: this.getDisplayName(leftPlayer),
          loserPlayer: rightPlayer,
          loserScore: game.rightScore,
          loserDisplayName: this.getDisplayName(rightPlayer),
          timestamp: game.timestamp
        };
        gameRows.push(gameRow);
      }
      else
      {
        const gameRow: GameRow={
          winnerPlayer: rightPlayer,
          winnerScore: game.leftScore,
          winnerDisplayName: this.getDisplayName(rightPlayer),
          loserPlayer: leftPlayer,
          loserScore: game.rightScore,
          loserDisplayName: this.getDisplayName(leftPlayer),
          timestamp: game.timestamp
        };
        gameRows.push(gameRow);
      }
    }
    this.dataSource$.next(gameRows);
  }

  getPlayer(playerId: string)
  {
    return this.playerMap[playerId];
  }

  getDisplayName(player: Player)
  {
    return this.displayNameProvider.get(player);
  }

}
