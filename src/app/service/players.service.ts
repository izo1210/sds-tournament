import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../model/player';
import { collection, query, doc, setDoc, DocumentReference } from "firebase/firestore"; 
import { FirebaseService } from './firebase/firebase.service';
import { deleteDoc, DocumentData, Firestore, getDoc, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Path } from '../util/path/path';
import { Paths } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  readonly empty: Player={id: "", firstName: "", lastName: "", hue: 0};

  private readonly db: Firestore=this.firebaseService.db;
  private readonly collectionName="players";
  readonly playerList$: BehaviorSubject<Player[]>=new BehaviorSubject<Player[]>([]);

  constructor(
    private firebaseService: FirebaseService    
  ) 
  { 
    this.refreshPlayerList();
  }

  refreshPlayerList(): void
  {
    const fromCollection=collection(this.db, this.collectionName);
    const select=query(fromCollection);
    getDocs(select).then(resultSet=>this.fillPlayerList(resultSet));
  }

  get(id: string): Promise<Player>
  {
    return getDoc(this.docRef(id))
      .then(documentSnapshot=>documentSnapshot.data() as Player);
  }

  set(player: Player): Promise<void>
  {
    return setDoc(this.docRef(player.id), player);
  }

  private docRef(id: string): DocumentReference<DocumentData>
  {
    return doc(this.db, this.collectionName, id);
  }

  private fillPlayerList(querySnapshot: QuerySnapshot<DocumentData>)
  {
    const newPlayerList: Player[]=[];
    querySnapshot.forEach(queryDocumentSnapshot=>newPlayerList.push(queryDocumentSnapshot.data() as Player));
    this.playerList$.next(newPlayerList);
  }

  del(id: string|null, confirmed: boolean): Promise<void>
  { 
    if(id==null || id==="" || !confirmed)
    {
      return new Promise<void>((resolve, reject)=>{reject();});
    }
    return deleteDoc(this.docRef(id));
  }
  
}
