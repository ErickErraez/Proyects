import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend: User;
  user: User;
  conversationId: string;
  textMessage: string;
  conversation: any[];
  shake: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  pictureMessage: any;
  showModal: boolean = false;
  @ViewChild('scrollBox') element: ElementRef;
  @ViewChild('inputImage') inputImage: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private userServices: UserService,
    private conversationServices: ConversationService, private authenticationServices: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);

    this.authenticationServices.getStatus().subscribe((session) => {
      this.userServices.getUsersById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.userServices.getUsersById(this.friendId).valueChanges().subscribe((data: User) => {
          this.friend = data;
          console.log(this.friend);
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversationId = ids.join('|');
          this.getConversation();
        }, (error) => {
          console.log(error);
        });
      });
    });

  }

  sendMessage() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      type: 'text',
      sender: this.user.uid,
      reciver: this.friend.uid
    };

    this.conversationServices.createConversacion(message).then((succes) => {
      this.textMessage = '';
    }).catch((error) => {
      console.log(error);
    });

  }

  sendZumbido() {
    const message = {
      uid: this.conversationId,
      timestamp: Date.now(),
      text: null,
      type: 'zumbido',
      sender: this.user.uid,
      reciver: this.friend.uid
    };



    this.conversationServices.createConversacion(message).then((succes) => {
    });
    this.doZumbido();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }

  zumbidoText(message) {
    if (message.sender === this.user.uid) {
      return 'Has enviado un Zumbido!';
    } else {
      return 'Te han enviado un Zumbido!';
    }
  }

  getConversation() {
    this.conversationServices.getConversation(this.conversationId).valueChanges().subscribe((data) => {
      this.conversation = data;
      this.conversation.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationServices.editConversacion(message);
          if (message.type === 'text') {
            const audio = new Audio('assets/sound/new_message.m4a');
            audio.play();
          } else if (message.type === 'zumbido') {
            this.doZumbido();
          }

        }

      });
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showModal = true;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  closeModal() {
    this.showModal = false;
    this.croppedImage = '';
    this.inputImage.nativeElement.value = '';
  }

  async sendImage() {
    const currentImageId = Date.now();
    try {
      // tslint:disable-next-line:max-line-length
      await this.firebaseStorage.ref(`messagesPictures/${currentImageId}|${this.conversationId}.jpg`).putString(this.croppedImage, 'data_url');
      this.pictureMessage = this.firebaseStorage.ref(`messagesPictures/${currentImageId}|${this.conversationId}.jpg`).getDownloadURL();
    } catch (err) {
      console.log(err);
    }
    this.pictureMessage.subscribe(async url => {
      const message = {
        uid: this.conversationId,
        timestamp: Date.now(),
        text: url,
        sender: this.user.uid,
        receiver: this.friendId,
        type: 'image'
      };
      try {
        await this.conversationServices.createConversacion(message);
        this.showModal = false;
        this.croppedImage = '';
        this.inputImage.nativeElement.value = '';
      } catch (err) {
        console.log(err);
      }
    }, err => console.log(err));

  }

  ngOnInit() {
  }

}


/*    */
