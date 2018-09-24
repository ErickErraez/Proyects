import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  query: string = '';
  friends: User[];
  user: User;

  constructor(private userServices: UserService, private authenticationsServices: AuthenticationService, private router: Router) {
    this.userServices.getUsers().valueChanges().subscribe((succes: User[]) => {
      this.friends = succes;
    }, (error) => {
      console.log(error);
    });

    this.authenticationsServices.getStatus().subscribe((status) => {
      this.userServices.getUsersById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.authenticationsServices.logout().then(() => {
      alert('Sesion Cerrada con Exito');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
