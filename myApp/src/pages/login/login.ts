import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { Status, User } from '../../interfaces/user';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/services-user/services-auth';
import { ServicesUserProvider } from '../../providers/services-user/services-user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  password: string;
  password2: string;
  email: string;
  status: any;
  nick: string;
  opt: string = 'signin';
  loginErrorString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: ServicesUserProvider, private toastCtrl: ToastController) {

  }
  registerWithEmail() {

    if (this.nick === undefined || this.email === undefined || this.status === undefined || this.password === undefined || this.password2 === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Debes completar todos los campos',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if (this.password.length < 6) {
      let toast = this.toastCtrl.create({
        message: 'La contraseña debe tener mas de 6 digitos',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else if (this.password != this.password2) {
      let toast = this.toastCtrl.create({
        message: 'Las contraseñas no coinciden',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.authService.registerWithEmail(this.email, this.password).then((data) => {
        const user: User = {
          nick: this.nick,
          email: this.email,
          status: this.status,
          friends: null,
          uid: data.user.uid,
          active: true
        }
        this.userService.add(user).then((data) => {
          let toast = this.toastCtrl.create({
            message: 'Usuario registrado con éxito',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }).catch((error) => {
          console.log(error.code);
        });
      }).catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/invalid-email') {
          let toast = this.toastCtrl.create({
            message: 'El email es invalido',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        if (error.code === 'auth/email-already-in-use') {
          let toast = this.toastCtrl.create({
            message: 'El email ya esta en uso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    }
  }

  mayus(e) {
    this.email = this.email.toLowerCase();
  }

  loginWithEmail() {
    if (this.email === undefined || this.password === undefined) {
      let toast = this.toastCtrl.create({
        message: 'Debes llenar todos los campos',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.authService.loginWithEmail(this.email, this.password).then((data) => {
        let toast = this.toastCtrl.create({
          message: 'Bienvenido',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(HomePage);
      }).catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/invalid-email') {
          let toast = this.toastCtrl.create({
            message: 'El email es invalido',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        } else if (error.code === 'auth/user-not-found') {
          let toast = this.toastCtrl.create({
            message: 'Usuario no encontrado',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        } else if (error.code === 'auth/wrong-password') {
          let toast = this.toastCtrl.create({
            message: 'La contraseña es incorrecta',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });
    }
  }
  ionViewDidLoad() {
  }
  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
  backToHome() {
    this.navCtrl.pop();
  }

}
