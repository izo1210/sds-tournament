import { Injectable } from '@angular/core';
import { Auth } from "firebase/auth";
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseService } from './firebase/firebase.service';
import { Paths } from '../app-routing.module';


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
      .then(user=>Paths.get.play.navigate(this.router))
      .catch(error=>alert(error.message));
  }

  public logout()
  {
    this.auth.signOut();
    Paths.get.login.navigate(this.router);
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
          Paths.get.login.navigate(this.router);
        }
        resolve(hasUser);
      })
    });
  }

}
