import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { Player } from 'src/app/model/player';
import { CurrentGameService } from 'src/app/service/current-game.service';
import { PlayersService } from 'src/app/service/players.service';
import { PlayerPropertyProvider } from 'src/app/common/player-property-provider/player-property-provider';
import { PropertiesService } from 'src/app/service/properties.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-first-player',
  templateUrl: './select-first-player.component.html',
  styleUrls: ['./select-first-player.component.sass']
})
export class SelectFirstPlayerComponent implements OnInit {
  public playerPropertyProvider: PlayerPropertyProvider=new PlayerPropertyProvider(this.currentGameService.getPlayers());

  readonly serveCountControl=new FormControl<number>(this.propertiesService.serveCount, [Validators.min(2), Validators.max(5)]);
  readonly winScoreControl=new FormControl<number>(this.propertiesService.winScore, [Validators.min(11), Validators.max(21)]);
  readonly winDiffControl=new FormControl<number>(this.propertiesService.winDiff, [Validators.min(1), Validators.max(2)]);
  readonly propertiesForm=new FormGroup({
    "serveCount": this.serveCountControl,
    "winScore": this.winScoreControl,
    "winDiff": this.winDiffControl,
  });

  constructor(
    public playersService: PlayersService,
    public currentGameService: CurrentGameService,
    private router: Router,
    public propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
  }

  selectPlayer(player: Player)
  {
    this.saveProperties();
    this.currentGameService.start(player);
    Paths.get.play.navigate(this.router);
  }

  back()
  {
    Paths.get.newRight.navigate(this.router);
  }

  saveProperties()
  {
    if(this.propertiesForm.invalid) return;
    this.propertiesService.serveCount=this.serveCountControl.value||3;
    this.propertiesService.winScore=this.winScoreControl.value||11;
    this.propertiesService.winDiff=this.winDiffControl.value||1;
  }

  errors(control: FormControl): string
  {    
    return JSON.stringify(control.errors);
  }
}
