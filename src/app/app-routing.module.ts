import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CurrentGameComponent } from './component/current-game/current-game.component';

import { LoginComponent } from './component/login/login.component';
import { ResultsComponent } from './component/results/results.component';
import { SelectLeftPlayerComponent } from './component/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './component/select-right-player/select-right-player.component';
import { SelectFirstPlayerComponent } from './component/select-first-player/select-first-player.component';

import AuthGuard from './service/auth.guard';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { Path } from './util/path/path';
import { EditPlayerComponent } from './component/edit-player/edit-player.component';
import { ManagePlayersComponent } from './component/manage-players/manage-players.component';
import { LogoutComponent } from './component/logout/logout.component';

export class Paths
{
  static readonly get=new Paths();

  login=new Path('login', false);
  logout=new Path('logout', false);
  players=new Path('players', true);
  player=new Path('player', false);
  play=new Path('play', false);
  newLeft=new Path('new-left', true);
  newRight=new Path('new-right', true);
  newFirst=new Path('new-first', false);
  results=new Path('results', false);
  statistics=new Path('statistics', false);

  //location.back() works randomly
  back(router: Router)
  {
    let maxLastVisited=0;
    let last=this.login;
    for(let path of Object.values(this))
    {
      if(path.lastVisited>maxLastVisited)
      {
        maxLastVisited=path.lastVisited;
        last=path;
      }
    }
    last.navigate(router);
  }

}

const paths=Paths.get;

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: paths.login.path, component: LoginComponent },
  { path: paths.logout.path, component: LogoutComponent },
  { path: paths.players.path, component: ManagePlayersComponent, canActivate: [AuthGuard] },
  { path: paths.player.path, component: EditPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.play.path, component: CurrentGameComponent, canActivate: [AuthGuard]  },
  { path: paths.newLeft.path, component: SelectLeftPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.newRight.path, component: SelectRightPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.newFirst.path, component: SelectFirstPlayerComponent, canActivate: [AuthGuard]  },
  { path: paths.results.path, component: ResultsComponent, canActivate: [AuthGuard]  },
  { path: paths.statistics.path, component: StatisticsComponent, canActivate: [AuthGuard]  },
 // { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 

}

