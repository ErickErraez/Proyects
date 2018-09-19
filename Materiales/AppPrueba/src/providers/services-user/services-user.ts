import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User } from '../../interfaces/user';

@Injectable()
export class ServicesUserProvider {
  constructor(private angularFireDataBase: AngularFireDatabase, private angularFireStorage: AngularFireStorage) {

  }

  get() {
    return this.angularFireDataBase.list('users/');
  }

  getById(id) {
    return this.angularFireDataBase.object('users/' + id);
  }

  add(user: User) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }

  update(user: User) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }

  uploadPicture(picture_name, image) {
    return this.angularFireStorage.ref('pictures/' + picture_name).putString(image, 'data_url');
  }
  getDownloadURL(picture_name) {
    return this.angularFireStorage.ref('pictures/' + picture_name).getDownloadURL();
  }

}