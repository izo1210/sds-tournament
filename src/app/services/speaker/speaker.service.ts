import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private available: boolean=('speechSynthesis' in window);
  public on: boolean=true;

  speak(text: string)
  {
    if(!this.available || !this.on) return;
    const ssu=new SpeechSynthesisUtterance();
    ssu.lang="hu-HU";
    ssu.text=text;
    ssu.volume=1;
    window.speechSynthesis.speak(ssu);
  }
}
