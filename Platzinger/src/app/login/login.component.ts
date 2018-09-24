import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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
      alert('Logueado Correctamente');
      console.log(data);
      this.router.navigate(['home']);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }

  facebookLogin() {
    this.authenticacion.facebookLogin().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  register() {
    this.authenticacion.registerWithEmail(this.email, this.password).then((data) => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };

      this.userServices.createrUser(user).then((response) => {
        alert('Registrado Correctamente');
        console.log(response);
      }).catch((error) => {
        console.log(error);
        alert('Ocurrio un error');
      });

    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }

  logout() {
    this.authenticacion.logout();
  }

}
