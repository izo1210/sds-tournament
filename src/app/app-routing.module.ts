import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Path } from './util/path/path';
import { AuthService } from './services/auth/auth.service';
import { CurrentGameComponent } from './pages/current-game/current-game.component';
import { EditPlayerComponent } from './pages/edit-player/edit-player.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ManagePlayersComponent } from './pages/manage-players/manage-players.component';
import { ResultsComponent } from './pages/results/results.component';
import { SelectLeftPlayerComponent } from './pages/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './pages/select-right-player/select-right-player.component';
import { SelectFirstPlayerComponent } from './pages/select-first-player/select-first-player.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

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
  settings=new Path('settings', false);

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
  { path: paths.players.path, component: ManagePlayersComponent, canActivate: [AuthService] },
  { path: paths.player.path, component: EditPlayerComponent, canActivate: [AuthService]  },
  { path: paths.play.path, component: CurrentGameComponent, canActivate: [AuthService]  },
  { path: paths.newLeft.path, component: SelectLeftPlayerComponent, canActivate: [AuthService]  },
  { path: paths.newRight.path, component: SelectRightPlayerComponent, canActivate: [AuthService]  },
  { path: paths.newFirst.path, component: SelectFirstPlayerComponent, canActivate: [AuthService]  },
  { path: paths.results.path, component: ResultsComponent, canActivate: [AuthService]  },
  { path: paths.statistics.path, component: StatisticsComponent, canActivate: [AuthService]  },
  { path: paths.settings.path, component: SettingsComponent, canActivate: [AuthService]  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 

}

