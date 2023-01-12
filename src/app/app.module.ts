//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
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
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { TimeFilterComponent } from './components/time-filter/time-filter.component';
import { AddPlayerButtonComponent } from './components/add-player-button/add-player-button.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';
import { CurrentGameComponent } from './pages/current-game/current-game.component';
import { EditPlayerComponent } from './pages/edit-player/edit-player.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ManagePlayersComponent } from './pages/manage-players/manage-players.component';
import { ResultsComponent } from './pages/results/results.component';
import { SelectFirstPlayerComponent } from './pages/select-first-player/select-first-player.component';
import { SelectLeftPlayerComponent } from './pages/select-left-player/select-left-player.component';
import { SelectRightPlayerComponent } from './pages/select-right-player/select-right-player.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

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
    TimeFilterComponent,
    StatisticsComponent,
    EditPlayerComponent,
    ManagePlayersComponent,
    AddPlayerButtonComponent,
    NavigationButtonComponent,
    LogoutComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSidenavModule,
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
