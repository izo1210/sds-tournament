import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';

@Component({
  selector: 'app-add-player-button',
  templateUrl: './add-player-button.component.html',
  styleUrls: ['./add-player-button.component.sass']
})
export class AddPlayerButtonComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick()
  {
    Paths.get.player.navigate(this.router);
  }

}
