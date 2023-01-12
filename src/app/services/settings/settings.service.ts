import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public serveCount: number=3;
  public winScore: number=11;
  public winDiff: number=1;
  public speakTimeout: number=2000;

  constructor() { }
}
