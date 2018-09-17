import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LugarPage } from "../lugar/lugar";
import { LugarServices } from '../../services/lugares.services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lugares: any = [];

  constructor(public navCtrl: NavController, public lugarServices: LugarServices, public alertCtrl: AlertController) {
    this.lugarServices.getLugares().valueChanges()
      .subscribe((lugaresFB) => {
        this.lugares = lugaresFB;
      });
  }
  navegar(name) {
    this.navCtrl.push(LugarPage, { nombre: name });
  }

  goToDetail() {
    this.navCtrl.push(LugarPage, { lugar: {} });
  }

  goToDetailExist(lugar) {
    this.navCtrl.push(LugarPage, { lugar: lugar });
  }

  deleteLugar(lugar) {
    const confirm = this.alertCtrl.create({
      title: 'Eliminar',
      message: 'Esta seguro que desea eliminar este lugar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            return this.lugarServices.deleteLugar(lugar).then(()=>{
              const alert = this.alertCtrl.create({
                title: 'Aviso!',
                subTitle: 'Lugar eliminado con exito!',
                buttons: ['OK']
              });
              alert.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
