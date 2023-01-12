import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlayersService } from 'src/app/services/players/players.service';
import { GamesService } from 'src/app/services/games/games.service';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit, AfterViewInit {
  readonly displayedColumns: string[]=[
    "winnerPlayerId",
    "winnerScore",
    "loserPlayerId",
    "loserScore",
    "timestamp"
  ];

  readonly dataSource=new MatTableDataSource<Game>([]);

  @ViewChild(MatSort) sort: MatSort|null=null;  

  constructor(
    public gamesService: GamesService,
    public playersService: PlayersService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort=this.sort; //important to make sort working
  }  
  
  formatTimestamp(timestamp: string): string
  {
    return timestamp.substring(0, 16).replace('T', ' ');
  }

  onFilter(from: string, to: string): void
  {
    this.gamesService.query(
      this.gamesService.range(from,to), 
      games=>this.dataSource.data=games);
  }
}
