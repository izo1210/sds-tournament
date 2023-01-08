import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { CurrentGameService } from 'src/app/service/current-game.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.sass']
})
export class CurrentGameComponent implements OnInit {
  public paths=Paths.get;

  constructor(
    public currentGameService: CurrentGameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.currentGameService.state$.value===CurrentGameService.STATE_NOT_READY)
    {
      this.paths.newLeft.navigate(this.router);
    }
    
  }


}
