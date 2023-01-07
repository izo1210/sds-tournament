import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private available: boolean=('speechSynthesis' in window);
  public on: boolean=true;

  speak(text: string)
  {
    if(!this.available || !this.on)
    {
      return;
    }
    const ssu=new SpeechSynthesisUtterance();
    ssu.lang="hu-HU";
    ssu.text=this.translate(text);
    window.speechSynthesis.speak(ssu);
  }

  private translate(text: string): string
  {
    //text=text.replace("Martin", "Marteen");
    //text=text.replace("Tamás", "Tomaasch");
    /*text=text.replace("11", "teazeneggg");
    text=text.replace("10", "teaz");
    text=text.replace("0", "nulla");
    text=text.replace("1", "eggg");
    text=text.replace("2", "ketttőő");
    text=text.replace("3", "háárom");
    text=text.replace("4", "neigh");
    text=text.replace("5", "oet");
    text=text.replace("6", "hot");
    text=text.replace("7", "hate");
    text=text.replace("8", "nyolts");
    text=text.replace("9", "kilents");*/
    return text;
  }
}
