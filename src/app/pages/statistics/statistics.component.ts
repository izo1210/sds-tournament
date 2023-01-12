import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/model/game';
import { PlayerStatistics, PlayerStatisticsMap } from 'src/app/model/player-statistics';
import { GamesService } from 'src/app/services/games/games.service';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  readonly displayedColumns: string[]=[
    "player",
    "winTotal",
    "scoreTotal",
    "diffTotal",
    "gameTotal",
    "winPerGame",
    "scorePerGame",
    "diffPerGame",
  ];

  readonly dataSource=new MatTableDataSource<PlayerStatistics>([]);

  @ViewChild(MatSort) sort: MatSort|null=null;  

  constructor(
    public gamesService: GamesService,
    public playersService: PlayersService,
  ) { }

  ngOnInit(): void {  
  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort; //important to make sort working
  }  
  
  formatFloat(float: Number): string
  {
    return float.toFixed(2);
  }

  onFilter(from: string, to: string): void
  {
    this.gamesService.query(
      this.gamesService.range(from,to), 
      games=>this.refreshDataSource(games));
  }

  private refreshDataSource(games: Game[]): void
  {
    const playerStatisticsMap: PlayerStatisticsMap={};
    this.playersService.list$.value
      .forEach(player=>playerStatisticsMap[player.id]=new PlayerStatistics(player));

    for(let game of games)
    {
      playerStatisticsMap[game.winnerPlayerId]?.updateAsWinner(game);
      playerStatisticsMap[game.loserPlayerId]?.updateAsLoser(game);
    }

    this.dataSource.data=Object.values(playerStatisticsMap)
      .filter(playerStatistics=>playerStatistics.gameTotal>0);
  }

}
