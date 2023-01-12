import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Paths } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'SDS Tournament';

  public sidenavOpened$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  public paths=Paths.get;
  public newActivated$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public playActivated$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public resultsActivated$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public statisticsActivated$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public playersActivated$: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(
    public router: Router,
  )
  {
    router.events.subscribe(event=>this.onRouterEvent(event));
  }

  onRouterEvent(event: any): void
  {
    if(!(event instanceof NavigationEnd)) return;
    const path=event.urlAfterRedirects;
    const p=this.paths;
    this.newActivated$.next(p.newLeft.eq(path)||p.newRight.eq(path)||p.newFirst.eq(path));
    this.playActivated$.next(p.play.eq(path));
    this.resultsActivated$.next(p.results.eq(path));
    this.statisticsActivated$.next(p.statistics.eq(path)); 
    this.playersActivated$.next(p.players.eq(path));
    this.sidenavOpened$.next(false);
  }

}
