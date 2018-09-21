import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Status } from '../../interfaces/user';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  constructor(public http: HttpClient, private angularFDB: AngularFireDatabase) { }

  createRequest(request) {
    const cleanEmail = request.receiverEmail.replace(/\./g, ',');
    return this.angularFDB.object('requests/' + cleanEmail + '/' + request.sender.uid).set(request);
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace(/\./g, ',');
    return this.angularFDB.object('requests/' + cleanEmail + '/' + request.sender.uid + '/status').set(status);
  }

  getRequestForEmail(email) {
    const cleanEmail = email.replace(/\./g, ',');
    return this.angularFDB.list('requests/' + cleanEmail)
  }

}
