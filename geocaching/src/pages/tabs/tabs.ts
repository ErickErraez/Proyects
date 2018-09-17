import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AboutPage } from "../about/about";
import { PerfilPage } from "../perfil/perfil";
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = PerfilPage;
  tab3Root: any = AboutPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }




}
