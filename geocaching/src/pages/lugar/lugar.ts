import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LugarServices } from '../../services/lugares.services';

/**
 * Generated class for the LugarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {
  lugar: any = {};
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public lugaresServices: LugarServices) {
    this.lugar = navParams.get('lugar');
  }
  guardarLugar() {

    if (!this.lugar.id) {
      this.lugar.id = Date.now();
    }
    this.lugaresServices.createLugar(this.lugar);
    const alert = this.alertCtrl.create({
      title: 'Aviso!',
      subTitle: 'Lugar guardado con exito!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
    console.log(this.lugar);

  }


}
