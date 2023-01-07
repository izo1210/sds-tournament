import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { Auth, getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firebaseApp: FirebaseApp,
  ) { }

  get db(): Firestore
  {
    return getFirestore(this.firebaseApp);
  }

  get auth(): Auth
  {
    return getAuth(this.firebaseApp);
  }
}
