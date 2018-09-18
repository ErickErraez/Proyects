import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from '../../interfaces/user';

@Injectable()
export class ServicesUserProvider {
  constructor(private angularFireDataBase: AngularFireDatabase) {
  }
  get() {
    return this.angularFireDataBase.list('users/');
  }
  add(user: User) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
}