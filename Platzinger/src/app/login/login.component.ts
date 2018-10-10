import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    operation: string = 'login';
    email: string = null;
    password: string = null;
    nick: string = null;

    constructor(private authenticacion: AuthenticationService, private userServices: UserService, private router: Router) {

    }

    ngOnInit() {
    }

    login() {
        this.authenticacion.loginWithEmail(this.email, this.password).then((data) => {
            swal({
                title: 'Logueado con Exito!',
                icon: 'success',
            });
            console.log(data);
            this.router.navigate(['home']);
        }).catch((error) => {
            swal({
                title: 'Ocurrio un Error!',
                icon: 'error',
            });

            console.log(error);
            debugger;
        });
    }

    facebookLogin() {
        this.authenticacion.facebookLogin().then((data) => {
            this.router.navigate(['home']);
        }).catch((error) => {
            console.log(error);
        });
    }

    register() {
        if (this.password.length < 6) {

            swal({
                title: 'Error!',
                text: 'La Contraseña debe ser mayor a 6 digitos!',
                icon: 'error',
            });

        } else {
            this.authenticacion.registerWithEmail(this.email, this.password).then((data) => {
                const user = {
                    uid: data.user.uid,
                    email: this.email,
                    nick: this.nick
                };

                this.userServices.createrUser(user).then((response) => {
                    swal({
                        title: 'Registrado Correctamente!',
                        icon: 'success',
                    });
                    this.router.navigate(['home']);
                }).catch((error) => {
                    swal({
                        title: 'Ocurrio un Error!',
                        icon: 'error',
                    });
                });

            }).catch((error) => {
                swal({
                    title: 'Ocurrio un Error!',
                    icon: 'error',
                });
            });

        }
    }

    logout() {
        this.authenticacion.logOut();
    }

}
