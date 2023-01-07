import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, Auth } from "firebase/auth";
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseService } from './firebase/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth=this.firebaseService.auth;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) 
  {
  }

  public login(email: string, password: string)
  {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(user=>this.router.navigate(["/current-game"]))
      .catch(error=>alert(error.message));
  }

  public logout()
  {
    this.auth.signOut();
    this.router.navigate(["/login"]);
  }

  public loggedIn(): Promise<boolean>
  {
    return new Promise((resolve)=>
    {
      this.auth.onAuthStateChanged((user)=>
      {
        const hasUser: boolean=user!=null;
        if(hasUser===false)
        {
          this.router.navigate(["/login"]);  
        }
        resolve(hasUser);
      })
    });
  }

}
