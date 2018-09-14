import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AuthService {
  constructor(public afDB: AngularFireDatabase, public snackBar: MatSnackBar, public afAuth: AngularFireAuth) {
    this.isLogged();
  }

  loginFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result) => {
        console.log(result);
        this.snackBar.open('Bienvenido!', null, {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public isLogged() {
    return this.afAuth.authState;
  }

  public logout() {
    this.snackBar.open('Sesion Terminada', null, {
      duration: 2000,
    });
    this.afAuth.auth.signOut();

  }

  public getUser() {
    return this.afAuth.auth;
  }
}
