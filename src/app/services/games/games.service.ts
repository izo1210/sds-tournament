import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { DocumentData, Query, query, where } from '@angular/fire/firestore';
import { Game } from 'src/app/model/game';
import { FirebaseCollection } from 'src/app/util/firebase-collection/firebase-collection';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends FirebaseCollection<Game> {

  constructor(
    firebaseApp: FirebaseApp,
  ) 
  { 
    super(firebaseApp, "games", data=>new Game(data));
  }

  range(from: string, to: string): Query<DocumentData>
  {
    if(from==null) from="";
    from=from.trim();
    if(to==null) to="";
    to=to.trim();  

    let queryRef: Query<DocumentData>;
    if(from==="" && to==="")
    {
      queryRef=query(this.collection);
    }
    else if(from!=="" && to==="")
    {
      queryRef=query(this.collection, where("timestamp", ">=", from));
    }
    else if(from==="" && to!=="")
    {
      queryRef=query(this.collection, where("timestamp", "<", to));
    }
    else
    {
      queryRef=query(this.collection, where("timestamp", ">=", from), where("timestamp", "<", to));
    }
    return queryRef;
  }


  
}
