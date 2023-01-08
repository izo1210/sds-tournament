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
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
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
import { StatisticsComponent } from './component/statistics/statistics.component';
import { EditPlayerComponent } from './component/edit-player/edit-player.component';
import { ManagePlayersComponent } from './component/manage-players/manage-players.component';
import { AddPlayerButtonComponent } from './component/add-player-button/add-player-button.component';
import { NavigationButtonComponent } from './component/navigation-button/navigation-button.component';
import { LogoutComponent } from './component/logout/logout.component';

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
    StatisticsComponent,
    EditPlayerComponent,
    ManagePlayersComponent,
    AddPlayerButtonComponent,
    NavigationButtonComponent,
    LogoutComponent,
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
    MatRadioModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
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
