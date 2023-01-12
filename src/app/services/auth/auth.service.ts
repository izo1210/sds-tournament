import { Injectable } from '@angular/core';
import { Auth } from "firebase/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Paths } from '../../app-routing.module';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private readonly auth: Auth=getAuth(this.firebaseApp);

  constructor(
    private firebaseApp: FirebaseApp,
    private router: Router
  ) 
  { }

  login(email: string, password: string)
  {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(user=>Paths.get.play.navigate(this.router))
      .catch(error=>alert(error.message));
  }

  logout()
  {
    this.auth.signOut();
    Paths.get.login.navigate(this.router);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
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
