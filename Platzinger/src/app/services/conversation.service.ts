import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDb: AngularFireDatabase) {

  }

  createConversacion(conversation) {
    return this.angularFireDb.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }

  getConversation(uid) {
    return this.angularFireDb.list('conversations/' + uid);
  }

  editConversacion(conversation) {
    return this.angularFireDb.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }

}
