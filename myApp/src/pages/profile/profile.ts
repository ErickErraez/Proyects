import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { AuthService } from '../../providers/services-user/services-auth';
import { ServicesUserProvider } from '../../providers/services-user/services-user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private userServices: ServicesUserProvider) {

    this.authService.getStatus().subscribe((data) => {
      this.userServices.getById(data.uid).valueChanges().subscribe((user: any) => {
        this.user = user;
        console.log(this.user);
      }, (error) => {
        console.log(error)
      });
    }, (error) => {
      console.log(error)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  guardarPerfil() {
    this.userServices.update(this.user).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Usuario editado con éxito',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((error) => {
      console.log(error);
    });
  }

}
