import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ConversationProvider {
  constructor(public http: HttpClient, private angularFDB: AngularFireDatabase) { }

  add(conversation) {
    return this.angularFDB
      .object(
        "conversations/" + conversation.uid + "/" + conversation.timestamp
      )
      .set(conversation);
  }

  getById(uid) {
    return this.angularFDB.list('conversations/' + uid);
  }

}
