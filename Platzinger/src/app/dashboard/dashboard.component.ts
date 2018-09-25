import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  query = '';
  friends: User[];
  user: User;
  friendEmail = '';

  // tslint:disable-next-line:max-line-length
  constructor(private userServices: UserService, private modalService: NgbModal, private request: RequestService, private authenticationsServices: AuthenticationService, private router: Router) {
    this.userServices.getUsers().valueChanges().subscribe((succes: User[]) => {
      this.friends = succes;
    }, (error) => {
      console.log(error);
    });

    this.authenticationsServices.getStatus().subscribe((status) => {
      this.userServices.getUsersById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;

        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends); // transforma en array un objecto
        }

      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.authenticationsServices.logOut().then(() => {
      swal({
        title: 'Session Cerrada!',
        icon: 'success',
      });
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    }, (reason) => {

    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiverEmail: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };

    this.request.createRequest(request).then(() => {
      swal({
        title: 'Solicitud enviada correctamente!!',
        icon: 'success',
      });
    }).catch((error) => {
      swal({
        title: 'Ocurrio un Error!',
        icon: 'error',
      });
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
