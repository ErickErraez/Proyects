import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  constructor(private activatedRoute: ActivatedRoute, private userServices: UserService) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
    this.userServices.getUsersById(this.friendId).valueChanges().subscribe((data: User) => {
      this.friend = data;
    }, (error) => {
      console.log(error);
    });
    console.log(this.friend);
  }

  ngOnInit() {
  }

}
