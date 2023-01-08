import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from 'src/app/model/game';
import { GameRow } from 'src/app/model/game/game-row';
import { Player } from 'src/app/model/player';
import { GamesService } from 'src/app/service/games/games.service';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';

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

  readonly playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider([]);

  private playerMap: any={};

  private gamesSubscription: Subscription=this.gamesService.games$.subscribe(games=>this.refreshDataSource(games));
  private playersSubscription: Subscription=this.playersService.playerList$.subscribe(playerList=>this.fillPlayerMap(playerList));

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
    this.playerPropertyProvider.setPlayers(Object.values(this.playerMap));
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
          winnerScore: game.rightScore,
          winnerDisplayName: this.getDisplayName(rightPlayer),
          loserPlayer: leftPlayer,
          loserScore: game.leftScore,
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
    if(this.playerMap[playerId]==null)
    {
      this.playerMap[playerId]={id: playerId, firstName: playerId, lastName: "", hue: 0};
    }
    return this.playerMap[playerId];
  }

  getDisplayName(player: Player)
  {
    return this.playerPropertyProvider.getDisplayName(player);
  }

}
