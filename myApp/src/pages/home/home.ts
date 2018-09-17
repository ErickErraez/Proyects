import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { ConversationPage } from "../conversation/conversation";
import { User } from "../../interfaces/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  
  constructor(public navCtrl: NavController) {
    let usuario1: User = {
      nick: 'Marco1',
      subnick: 'Marquito',
      age: 18,
      email: 'Marco@gmail.com',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Marco2',
      subnick: 'Marquito',
      age: 18,
      email: 'Marco@gmail.com',
      friend: false,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Marco3',
      subnick: 'Marquito',
      age: 18,
      email: 'Marco@gmail.com',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Marco4',
      subnick: 'Marquito',
      age: 18,
      email: 'Marco@gmail.com',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Marco5',
      subnick: 'Marquito',
      age: 18,
      email: 'Marco@gmail.com',
      friend: true,
      uid: 5
    };

    this.friends = [usuario1, usuario2, usuario3, usuario4, usuario5];


  }


  goToConversation(user: User){
    this.navCtrl.push(ConversationPage,{'user':user});
    }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }


}
