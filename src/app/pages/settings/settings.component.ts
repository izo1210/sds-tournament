import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GamesService } from 'src/app/services/games/games.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { FormHelper } from 'src/app/util/form-helper/form-helper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  readonly settingsForm=FormHelper.createForm(this.settingsService);

  constructor(
    private gamesService: GamesService,
    public settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    FormHelper.dataToForm(this.settingsService, this.settingsForm);
  }

  save()
  {
    FormHelper.formToData(this.settingsForm, this.settingsService);
  }

  errors(control: AbstractControl): string
  {    
    return FormHelper.errorText(control);
  }

  copyGamesToClipboard(): void
  {
    this.gamesService.query(this.gamesService.all(), games=>this.copyToClipboardAsJSON(games));
  }

  copyToClipboardAsJSON(data: any): void
  {
    navigator.clipboard.writeText(JSON.stringify(data, null, 1));
    alert("Copied to clipboard");
  }




}
