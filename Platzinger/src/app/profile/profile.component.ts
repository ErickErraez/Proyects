import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private userService: UserService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUsersById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid).then(() => {
            console.log('Cambios guardados correctamente');
          }).catch((error) => {
            swal({
              title: 'Ocurrio un Error!',
              icon: 'error',
            });
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
      this.userService.editUser(this.user).then(() => {
        swal({
          title: 'Cambios Guardados Correctamente!',
          icon: 'success',
        });
      }).catch((error) => {
        swal({
          title: 'Ocurrio un Error!',
          icon: 'error',
        });
        console.log(error);
      });
    } else {
      this.userService.editUser(this.user).then(() => {
        swal({
          title: 'Cambios Guardados Correctamente!',
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
    this.router.navigate(['home']);
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
