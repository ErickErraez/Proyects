import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { ConversationPage } from "../conversation/conversation";
import { User, Status } from '../../interfaces/user';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { AuthService } from '../../providers/services-user/services-auth';
import { RequestProvider } from '../../providers/services-user/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  query: string;
  status: Status;
  user: User;

  constructor(public toastController: ToastController, private alertController: AlertController, public request: RequestProvider, private authService: AuthService, public navCtrl: NavController, public userService: ServicesUserProvider) {

    const usersObservable = this.userService.get();
    usersObservable.valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
    });

    this.authService.getStatus().subscribe((session) => {
      console.log(session)
      this.userService.getById(session.uid).valueChanges().subscribe((user: User) => { //REVISAR
        this.user = user;
        this.user.friends = Object.keys(this.user.friends).map(key => this.user.friends[key]);
        console.log(this.user.friends[0]);

      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    });
  }

  goToConversation(user: User) {
    this.navCtrl.push(ConversationPage, { 'user': user });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  getIconByStatus(status) {
    let icon = "";
    switch (status) {
      case 'Online':
        icon = 'logo_live_online.png';
        break;
      case 'Offline':
        icon = 'logo_live_offline.png';
        break;
      case 'Busy':
        icon = 'logo_live_busy.png';
        break;
      case 'AppearOffline':
        icon = 'logo_live_appear_offline.png';
        break;
      case 'Away':
        icon = 'logo_live_away.png';
        break;
    }
    return icon;
  }

  sendRequest() {
    const prompt = this.alertController.create({
      title: 'Agregar amigo',
      message: 'Ingresar email de tu amigo',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiverEmail: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.request.createRequest(request).then((data) => {
              let toast = this.toastController.create({
                message: 'Solicitud enviada',
                duration: 3000,
                position: 'botom'
              });
              toast.present();
            }).catch((error) => {
              console.log(error);
            })
          }
        }
      ]
    });
    prompt.present();
  }

}
