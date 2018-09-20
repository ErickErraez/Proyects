import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from "../../interfaces/user";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable()
export class ServicesUserProvider {
  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage
  ) { }

  get() {
    return this.angularFireDataBase.list("users/");
  }

  getById(id) {
    return this.angularFireDataBase.object("users/" + id);
  }

  add(user: User) {
    return this.angularFireDataBase.object("/users/" + user.uid).set(user);
  }

  update(user: User) {
    return this.angularFireDataBase.object("/users/" + user.uid).set(user);
  }

  uploadPicture(picture_name, image) {
    return this.angularFireStorage
      .ref("pictures/" + picture_name)
      .putString(image, "data_url");
  }
  getDownloadURL(picture_name) {
    return this.angularFireStorage
      .ref("pictures/" + picture_name)
      .getDownloadURL();
  }

  addFriend(uid, friendId) {
    this.angularFireDataBase.object('users/' + uid + '/friends/' + friendId).set(friendId);
    return this.angularFireDataBase.object('users/' + friendId + '/friends/' + uid).set(uid);
  }

}
