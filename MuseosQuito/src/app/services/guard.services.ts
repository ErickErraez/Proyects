import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AutorizacionServices } from './autorizacion.services';

@Injectable()
export class GuardServices implements CanActivate {
    loggedIn = false;
    constructor(private autorizacionService: AutorizacionServices) {
        this.autorizacionService.isLogged()
            .subscribe((response) => {
                if (response && response.uid) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            }, (error) => {
                this.loggedIn = false;
            });
    }

    canActivate() {
        return this.loggedIn;
    }
}
