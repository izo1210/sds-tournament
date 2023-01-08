import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentGameComponent } from './component/current-game/current-game.component';

import { LoginComponent } from './component/login/login.component';
import { ResultsComponent } from './component/results/results.component';
import { SelectLeftPlayerComponent } from './component/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './component/select-right-player/select-right-player.component';
import { SelectFirstPlayerComponent } from './component/select-first-player/select-first-player.component';

import AuthGuard from './service/auth.guard';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { Path } from './util/path/path';

export class Paths
{
  static readonly get=new Paths();

  login=new Path('login');
  newLeft=new Path('new-left');
  newRight=new Path('new-right');
  newFirst=new Path('new-first');
  play=new Path('play');
  results=new Path('results');
  statistics=new Path('statistics');
}

const paths=Paths.get;

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: paths.login.path, component: LoginComponent },
  { path: paths.newLeft.path, component: SelectLeftPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.newRight.path, component: SelectRightPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.newFirst.path, component: SelectFirstPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.play.path, component: CurrentGameComponent, canActivate: [AuthGuard]  },
  { path: paths.results.path, component: ResultsComponent, canActivate: [AuthGuard]  },
  { path: paths.statistics.path, component: StatisticsComponent, canActivate: [AuthGuard]  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 

}

