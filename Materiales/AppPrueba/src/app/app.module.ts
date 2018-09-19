import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConversationPage } from '../pages/conversation/conversation';
import { ProfilePage } from '../pages/profile/profile';
import { ServicesUserProvider } from '../providers/services-user/services-user';
import { SearchPipe } from '../pipes/search';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../providers/services-user/services-auth';
import { Camera } from "@ionic-native/camera";
import { Geolocation } from "@ionic-native/geolocation";

export const firebaseConfig = {
  apiKey: "AIzaSyBY8hKyelzenloXFG6de56yKFS4UZHli4U",
  authDomain: "yavzinger.firebaseapp.com",
  databaseURL: "https://yavzinger.firebaseio.com",
  projectId: "yavzinger",
  storageBucket: "yavzinger.appspot.com",
  messagingSenderId: "14622928629"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesUserProvider,
    AuthService,
    Camera,
    Geolocation
  ]
})
export class AppModule { }
