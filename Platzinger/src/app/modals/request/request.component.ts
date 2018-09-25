import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { User } from '../../interfaces/user';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel, OnInit {

  scope: any;
  currentRequest: any;
  shouldAdd = 'yes';
  user: User;

  constructor(public dialogServices: DialogService, private userServices: UserService, private request: RequestService) {
    super(dialogServices);
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.request.setRequestStatus(this.currentRequest, 'accepted').then((data) => {
        console.log(data);
        this.userServices.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          swal({
            title: 'Solicitud Aceptada!',
            icon: 'success',
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd === 'no') {
      this.request.setRequestStatus(this.currentRequest, 'rejected').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    } else if (this.shouldAdd === 'later') {
      this.request.setRequestStatus(this.currentRequest, 'decideLater').then((data) => {
        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
    }
    this.close();
  }

  ngOnInit() {
    if (this.currentRequest) {
      this.userServices.getUsersById(this.currentRequest.sender).valueChanges().subscribe((user: User) => {
        this.user = user;
      }, err => console.log(err));
    }
  }

}
