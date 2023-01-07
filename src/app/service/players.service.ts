import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../model/player';
import { collection, query, where, doc, setDoc } from "firebase/firestore"; 
import { FirebaseService } from './firebase/firebase.service';
import { DocumentData, FieldPath, Firestore, getDoc, getDocs, orderBy, QuerySnapshot } from '@angular/fire/firestore';

const PLAYERS_TEST_DATA: Player[]=[
  { id: "zoltan.boros", firstName: "Zoli", lastName: "Boros", backgroundColor: "olive", color: "white"},
  { id: "martin.sinka", firstName: "Martin", lastName: "Sinka", backgroundColor: "purple", color: "white"},
  { id: "tamas.werner", firstName: "Tamás", lastName: "Werner", backgroundColor: "navy", color: "white"},
  { id: "zoltan.takacs", firstName: "Zoli", lastName: "Takács", backgroundColor: "green", color: "white"},
];

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  readonly playerList$: BehaviorSubject<Player[]>=new BehaviorSubject<Player[]>(/*PLAYERS_TEST_DATA*/[]);
  readonly empty: Player={id: "", firstName: "", lastName: "", color: "", backgroundColor: ""};

  private readonly db: Firestore=this.firebaseService.db;

  constructor(
    private firebaseService: FirebaseService    
  ) 
  { 
    const fromCollection=collection(this.db, "players");
    const select=query(fromCollection);

    getDocs(select).then(resultSet=>this.processResultSet(resultSet));
  }

  private processResultSet(resultSet: QuerySnapshot<DocumentData>)
  {
    const newPlayerList: Player[]=[];
    resultSet.forEach(doc=>newPlayerList.push(doc.data() as Player));
    this.playerList$.next(newPlayerList);
  }

  async get(id: string): Promise<Player>
  {
    const docRef=doc(this.db, "players", id);
    const docSnap=await getDoc(docRef);
    return new Promise((resolve, reject)=>{
      if(docSnap.exists())
      {
        resolve(docSnap.data() as Player);
      }
      else
      {
        reject("No such element");
      }
    });
  }
}
