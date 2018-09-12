import { Component } from '@angular/core';
import { AutorizacionServices } from './services/autorizacion.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  logUser: any = null;

  constructor(private autorizacionService: AutorizacionServices) {
    this.autorizacionService.isLogged()
      .subscribe((response) => {
        if (response && response.uid) {
          this.loggedIn = true;
          setTimeout(() => {
            this.logUser = this.autorizacionService.getUser().currentUser.email;
          }, 500);

        } else {
          this.loggedIn = false;
        }
      }, (error) => {
        this.loggedIn = false;
      });
  }
  logout() {
    this.autorizacionService.logout();
  }
}
