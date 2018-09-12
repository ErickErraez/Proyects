import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase/app';

@Injectable()

export class AutorizacionServices {


    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.isLogged();
    }
    public facebookLogin() {
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((result) => {
                console.log(result);
                alert('Logeado con Facebook');
                this.router.navigate(['lugares']);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public registro = (email, password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((Response) => {
                swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Usuario registrado con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
                console.log(Response);
                this.router.navigate(['lugares']);
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: 'Se encontro un error!',
                    text: 'Tipo de error: ' + error.statusText

                });
            });
    }

    public login = (email, password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then((Response) => {
                swal({
                    position: 'top-end',
                    type: 'info',
                    title: 'Bienvenido!',
                    showConfirmButton: false,
                    timer: 2000
                });
                console.log(Response);
                this.router.navigate(['lugares']);
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: 'Se encontro un error!',
                    text: 'Tipo de error: ' + error.statusText

                });
            });
    }

    public isLogged() {
        return this.angularFireAuth.authState;
    }

    public logout() {
        this.angularFireAuth.auth.signOut();
        swal({
            title: 'Session Terminada!',
            type: 'success',
        });
        this.router.navigate(['lugares']);
    }

    public getUser() {
        return this.angularFireAuth.auth;
    }

}
