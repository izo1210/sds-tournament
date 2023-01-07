//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
//Firebase
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
//AppComponents
import { LoginComponent } from './component/login/login.component';
import { ResultsComponent } from './component/results/results.component';
import { SelectLeftPlayerComponent } from './component/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './component/select-right-player/select-right-player.component';
import { SelectFirstPlayerComponent } from './component/select-first-player/select-first-player.component';
import { PlayerCardComponent } from './component/player-card/player-card.component';
import { CurrentGameComponent } from './component/current-game/current-game.component';
import { ScoreCardComponent } from './component/score-card/score-card.component';
import { GameCardComponent } from './component/game-card/game-card.component';
import { TimeFilterComponent } from './component/time-filter/time-filter.component';
import { StatComponent } from './component/stat/stat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResultsComponent,
    SelectLeftPlayerComponent,
    SelectRightPlayerComponent,
    SelectFirstPlayerComponent,
    PlayerCardComponent,
    CurrentGameComponent,
    ScoreCardComponent,
    GameCardComponent,
    TimeFilterComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
