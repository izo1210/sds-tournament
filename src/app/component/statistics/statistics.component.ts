import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Game } from 'src/app/model/game';
import { PlayerStatistics } from 'src/app/model/game/player-statistics';
import { Player } from 'src/app/model/player';
import { GamesService } from 'src/app/service/games/games.service';
import { PlayersService } from 'src/app/service/players.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

type PlayerMap={[key: string]: Player};
type StatisticsMap={[key: string]: PlayerStatistics};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort|null=null;

  readonly displayedColumns: string[]=[
    "player",
    "winTotal",
    "scoreTotal",
    "diffTotal",
    "gameTotal",
    "winPerGame",
    "scorePerGame",
    "diffPerGame",
    "spacer"
  ];

  private playerMap: PlayerMap={};
  readonly displayNameProvider: DisplayNameProvider=new DisplayNameProvider(false, Object.values(this.playerMap));
  readonly rows: PlayerStatistics[]=[];
  readonly dataSource=new MatTableDataSource<PlayerStatistics>(this.rows);

  private readonly gamesSubscription: Subscription=this.gamesService.games$.subscribe(games=>this.refreshDataSource(games));
  private readonly playersSubscription: Subscription=this.playersService.playerList$.subscribe(playerList=>this.fillPlayerMap(playerList));

  constructor(
    public gamesService: GamesService,
    public playersService: PlayersService

  ) { }

  ngOnInit(): void {    
  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort;
  }  

  ngOnDestroy(): void {
    this.playersSubscription.unsubscribe(); 
    this.gamesSubscription.unsubscribe();
  }  

  private fillPlayerMap(playerList: Player[]): void
  {
    this.playerMap={};
    playerList.forEach(player=>this.playerMap[player.id]=player);
    this.displayNameProvider.setPlayers(Object.values(this.playerMap));
  }

  private refreshDataSource(games: Game[]): void
  {
    const rowMap: StatisticsMap={};
    for(let playerId in this.playerMap)
    {
      rowMap[playerId]=new PlayerStatistics(this.playerMap[playerId]);
    }
    for(let game of games)
    {
      rowMap[game.leftPlayer].update(game);
      rowMap[game.rightPlayer].update(game);
    }
    this.dataSource.data=Object.values(rowMap);
  }

  getDisplayName(player: Player)
  {
    return this.displayNameProvider.get(player);
  }

}
