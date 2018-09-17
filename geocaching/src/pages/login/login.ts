import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AuthServices } from '../../services/auth.services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public viewCtrl: ViewController, public authServices: AuthServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook() {
    this.authServices.loginWithFacebook().then((response) => {
      const alert = this.alertCtrl.create({
        title: 'Login!',
        subTitle: 'Loggeado con exito!',
        buttons: ['OK']
      });
      alert.present();
      this.viewCtrl.dismiss();
      localStorage.setItem('LoginData', JSON.stringify(response));
    })
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }


}
