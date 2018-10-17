import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule, AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule, AngularFireStorage } from "@angular/fire/storage";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { ConversationPage } from "../pages/conversation/conversation";
import { ProfilePage } from "../pages/profile/profile";
import { ServicesUserProvider } from "../providers/services-user/services-user";
import { SearchPipe } from "../pipes/search";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../providers/services-user/services-auth";
import { Camera } from "@ionic-native/camera";
import { Vibration } from "@ionic-native/vibration";
import { Geolocation } from "@ionic-native/geolocation";
import { ConversationProvider } from "../providers/services-user/conversation";
import { RequestProvider } from '../providers/services-user/request';
import { ComponentsModule } from '../components/components.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const firebaseConfig = {
  apiKey: "AIzaSyBY8hKyelzenloXFG6de56yKFS4UZHli4U",
  authDomain: "yavzinger.firebaseapp.com",
  databaseURL: "https://yavzinger.firebaseio.com",
  projectId: "yavzinger",
  storageBucket: "yavzinger.appspot.com",
  messagingSenderId: "14622928629"
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    EmojiPickerModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesUserProvider,
    AuthService,
    Geolocation,
    Camera,
    ServicesUserProvider,
    AuthService,
    ConversationProvider,
    Vibration,
    RequestProvider
  ]
})
export class AppModule { }
