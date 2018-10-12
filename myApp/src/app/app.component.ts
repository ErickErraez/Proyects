import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController, Alert, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { ServicesUserProvider } from '../providers/services-user/services-user';
import { AuthService } from '../providers/services-user/services-auth';
import { RequestProvider } from '../providers/services-user/request';
import { User, Status } from '../interfaces/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  user: User;
  request: any;
  mailsShown: any = [];

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public userService: ServicesUserProvider, public authService: AuthService, public requestServices: RequestProvider, private modalController: ModalController, private toastController: ToastController, private alertController: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage }
    ];



    this.authService.getStatus().subscribe((session) => {
      if (session != null) {
        this.nav.setRoot(HomePage);
        this.userService.getById(session.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          this.getFriendsRequest();

        }, (error) => {
          console.log(error)
        });
      }
    });



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getFriendsRequest() {
    this.requestServices.getRequestForEmail(this.user.email).valueChanges().subscribe((request: any) => {
      this.request = request;
      this.request = this.request.filter((r) => {
        return r.status != 'accepted' && r.status != 'rejected'
      });
      this.request.forEach((r) => {
        if (this.mailsShown.indexOf(r.sender.email) === -1) {
          this.mailsShown.push(r.sender.email);
          this.showRadio(r);
        }
      });
    }, (error) => {
      console.log(error)
    });
  }

  showRadio(request) {
    let alert = this.alertController.create();
    alert.setTitle('Solicitud de amistad');
    alert.setMessage(request.sender.nick + 'Te ha enviado una solicitud deseas Aceptar?');
    alert.addInput({
      type: 'radio',
      label: 'Si',
      value: 'yes',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'No',
      value: 'no',
      checked: false
    });

    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        if (data === 'yes') {
          this.requestServices.setRequestStatus(request, 'accepted').then((data) => {
            this.userService.addFriend(this.user.uid, request.sender.uid)
          }).catch((error) => {
            console.log(error);
          });
        } else {
          this.requestServices.setRequestStatus(request, 'rejected').then((data) => {
            //Agregar Amigo
            console.log('Solicitud Rechazada');
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    });

    alert.present();

  }

  logout() {
    this.authService.logout();
    this.nav.setRoot(LoginPage);
  }

}
