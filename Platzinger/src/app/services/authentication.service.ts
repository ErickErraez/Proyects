import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {

  }

  getStatus() {
    return this.angularFireAuth.authState; // se comunica con firebase y trae el objeto de sesion de firebase
  }

  loginWithEmail(emai: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(emai, password);
  }

  registerWithEmail(emai: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(emai, password);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider;
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  logOut() {
    return this.angularFireAuth.auth.signOut();
  }

}
