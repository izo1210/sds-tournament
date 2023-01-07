import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, Query, query, setDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/app/model/game';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly db: Firestore=this.firebaseService.db;
  private readonly gamesRef=collection(this.db, "games");
  readonly games$: BehaviorSubject<Game[]>=new BehaviorSubject<Game[]>([]);
  readonly empty: Game={leftPlayer: "", leftScore: 0, rightPlayer: "", rightScore: 0, timestamp: "0000-00-00T00:00:00.000Z"};

  constructor(
    private firebaseService: FirebaseService    
  ) { }

  save(documentID: string, game: Game): Promise<void>
  {
    return setDoc(doc(this.db, "games", documentID), game);
  }

  queryAll()
  {
    getDocs(query(this.gamesRef)).then(snapshot=>{
      const newGames: Game[]=[];
      snapshot.forEach(doc=>newGames.push(doc.data() as Game));
      this.games$.next(newGames);
    });
  }

  queryRange(from: string, to: string)
  {
    if(from==null) from="";
    from=from.trim();
    if(to==null) to="";
    to=to.trim();  

    let queryRef: Query<unknown>;
    if(from==="" && to==="")
    {
      queryRef=query(this.gamesRef);
    }
    else if(from!=="" && to==="")
    {
      queryRef=query(this.gamesRef, where("timestamp", ">=", from));
    }
    else if(from==="" && to!=="")
    {
      queryRef=query(this.gamesRef, where("timestamp", "<", to));
    }
    else
    {
      queryRef=query(this.gamesRef, where("timestamp", ">=", from), where("timestamp", "<", to));
    }

    getDocs(queryRef).then(snapshot=>
    {
      const newGames: Game[]=[];
      snapshot.forEach(doc=>newGames.push(doc.data() as Game));
      this.games$.next(newGames);
    });
  }
}
