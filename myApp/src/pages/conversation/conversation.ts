import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { User } from "../../interfaces/user";
import { ServicesUserProvider } from "../../providers/services-user/services-user";
import { AuthService } from "../../providers/services-user/services-auth";
import { ConversationProvider } from '../../providers/services-user/conversation';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: "page-conversation",
  templateUrl: "conversation.html"
})
export class ConversationPage {
  user: User;
  friend: User;
  conversationId: any;
  message: string;
  conversation: any;
  shake: boolean;
  idFRIEND: any;
  valor: any;

  constructor(public navCtrl: NavController, public authService: AuthService, public vibration: Vibration, public navParams: NavParams, private userProvider: ServicesUserProvider, public conversationServices: ConversationProvider) {

    this.friend = this.navParams.get("data");
    console.log(this.friend);
    this.authService.getStatus().subscribe(
      data => {
        this.userProvider.getById(data.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          let idsArray = [this.user.uid, this.friend.uid].sort();
          console.log(idsArray);
          this.conversationId = idsArray.join('||');
          this.getConversation();

        },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  sendMessage() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      recevided: this.friend.uid,
      type: 'text',
      content: this.message
    };
    this.conversationServices.add(messageObject).then(() => {
      this.message = "";
    }).catch((error) => {
      console.log(error);
    });
  }

  getConversation() {
    this.conversationServices.getById(this.conversationId).valueChanges().subscribe((success) => {
      console.log(success);
      this.prueb(success);
      this.conversation = success;
    }, (error) => {
      console.log(error);
    });
  }

  getUserNickById(uid) {
    if (uid === this.friend.uid) {

      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  doZumbido() {
    const audio = new Audio('../assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    this.vibration.vibrate([2000, 800, 1500]);//expresado en milisegundos
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }

  sendZumbido() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      recevided: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationServices.add(messageObject).then(() => {
      this.doZumbido();
    }).catch((error) => {
      console.log(error);
    });
  }

  prueb(success) {
    for (var i = 0; i < success.length; i++) {
      if (this.user.uid == success[i].sender) {
        console.log(success[i].sender + " dice: " + success[i].content);
        this.idFRIEND = false;
        this.valor = 'recevided';
      } else {
        this.idFRIEND = true;
        this.valor = 'recevided';
      }
    }
  }

}
