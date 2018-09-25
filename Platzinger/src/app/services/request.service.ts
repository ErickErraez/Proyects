import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private angularFireDB: AngularFireDatabase) {

  }

  createRequest(request) {
    const cleanEmail = request.receiverEmail.replace(/\./g, ',');
    return this.angularFireDB.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace(/\./g, ',');
    return this.angularFireDB.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }

  getRequestForEmail(email) {
    const cleanEmail = email.replace(/\./g, ',');
    return this.angularFireDB.list('requests/' + cleanEmail);
  }

}
