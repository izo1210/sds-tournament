import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'SDS Tournament';

  constructor(
    public router: Router,
    private authService: AuthService
  )
  {

  }

  goToResults()
  {
    this.router.navigate(["/results"]);
  }

  goToSelectPlayerOne()
  {
    this.router.navigate(["/select-left-player"]);
  }

  logout()
  {
    this.authService.logout();
  }

}
