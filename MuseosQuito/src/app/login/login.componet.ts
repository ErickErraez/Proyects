import { Component } from '@angular/core';
import { AutorizacionServices } from '../services/autorizacion.services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    loginParams: any = {};

    constructor(private autorizacionService: AutorizacionServices) {
    }

    login() {
        this.autorizacionService.login(this.loginParams.email, this.loginParams.password);
    }
    facebookLoggin() {
        this.autorizacionService.facebookLogin();
    }
}
