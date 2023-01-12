import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/app/model/game';
import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  constructor(
    private gamesService: GamesService,
  ) { }

  ngOnInit(): void {
  }

  test()
  {
  }

  copyGamesToClipboard(): void
  {
    this.gamesService.query(this.gamesService.all(), games=>this.copyToClipboardAsJSON(games));
  }

  copyToClipboardAsJSON(data: any): void
  {
    navigator.clipboard.writeText(JSON.stringify(data, null, 1));
    alert("Copied to clipboard");
  }

}
