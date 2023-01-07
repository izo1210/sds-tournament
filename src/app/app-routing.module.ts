import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentGameComponent } from './component/current-game/current-game.component';

import { LoginComponent } from './component/login/login.component';
import { ResultsComponent } from './component/results/results.component';
import { SelectLeftPlayerComponent } from './component/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './component/select-right-player/select-right-player.component';
import { SelectFirstPlayerComponent } from './component/select-first-player/select-first-player.component';

import AuthGuard from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'current-game', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'current-game', component: CurrentGameComponent, canActivate: [AuthGuard]  },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard]  },
  { path: 'select-left-player', component: SelectLeftPlayerComponent, canActivate: [AuthGuard]  },
  { path: 'select-right-player', component: SelectRightPlayerComponent, canActivate: [AuthGuard]  },
  { path: 'select-first-player', component: SelectFirstPlayerComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: 'current-game' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
