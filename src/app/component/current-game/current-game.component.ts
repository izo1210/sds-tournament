import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { DisplayNameProvider } from 'src/app/util/display-name-provider/display-name-provider';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.sass']
})
export class CurrentGameComponent implements OnInit {

  constructor(
    public currentGameService: CurrentGameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.currentGameService.state$.value===CurrentGameService.STATE_NOT_READY)
    {
      this.router.navigate(["/select-left-player"]);
    }
    
  }


}
