import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { User, Status } from "../../interfaces/user";
import { AuthService } from "../../providers/services-user/services-auth";
import { ServicesUserProvider } from "../../providers/services-user/services-user";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {


  user: User;
  pictureId: any;
  location: any;
  state: any;

  constructor(public camera: Camera, public geolocation: Geolocation, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, public userServices: ServicesUserProvider, private httpClient: HttpClient) {

    this.authService.getStatus().subscribe(
      data => {
        this.userServices
          .getById(data.uid)
          .valueChanges()
          .subscribe(
            (user: any) => {
              this.user = user;
              console.log(this.user);
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }

  guardarPerfil() {
    if (this.location || this.state) {
      this.user.direccion = this.location;
      this.user.state = this.state;
    }
    this.userServices
      .update(this.user)
      .then(data => {
        console.log(data);
        let toast = this.toastCtrl.create({
          message: "Usuario editado con éxito",
          duration: 3000,
          position: "bottom"
        });
        toast.present();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async takePicture(source) {
    try {
      let cameraOptions: CameraOptions = {
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true
      };
      cameraOptions.sourceType = (source === 'camera') ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;
      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,' + result;
      this.pictureId = Date.now();
      this.userServices.uploadPicture(this.pictureId + '.jpg', image).then((data) => {
        this.userServices.getDownloadURL(this.pictureId + '.jpg').subscribe((url) => {
          this.user.avatar = url;
          let toast = this.toastCtrl.create({
            message: 'Foto subida',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }, (error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
    } catch (e) {
      console.error(e);
    }
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.httpClient.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.coords.latitude + "," + resp.coords.longitude + "&sensor=true&key=AIzaSyC5Cd6Tiu3oqs69v1GDk5_aTCwOk8B8ZIM")
        .subscribe(
          (data: any) => {
            this.location = data.results[0].formatted_address;
            console.log(this.location);
          },
          error => {
            console.log(error);
          }
        );
    })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
