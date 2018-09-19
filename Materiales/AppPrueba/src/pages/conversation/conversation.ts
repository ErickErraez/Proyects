import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../interfaces/user';
import { ServicesUserProvider } from '../../providers/services-user/services-user';

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {

  user: User;
  friends: User[];
  friend: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: ServicesUserProvider) {
    this.friend = this.navParams.get("user");
    console.log(this.friend);
    debugger;
    //this.friends = this.userProvider.get();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
