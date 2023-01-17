import { Injectable } from '@angular/core';

export interface Settings
{
  serveCount: number,
  winScore: number,
  winDiff: number,
  speakScoreTimeout: number,
  speakNameTimeout: number,  
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements Settings {
  serveCount=3;
  winScore=11;
  winDiff=1;
  speakScoreTimeout=500;
  speakNameTimeout=1000;
}
