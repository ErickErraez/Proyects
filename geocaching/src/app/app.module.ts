import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LugarPage } from "../pages/lugar/lugar";
import { PerfilPage } from "../pages/perfil/perfil";
import { TabsPage } from "../pages/tabs/tabs";
import { AboutPage } from "../pages/about/about";
import { LugarServices } from '../services/lugares.services';
import { LoginPage } from '../pages/login/login';
import { AuthServices } from '../services/auth.services';

export const firebaseConfig = {
  apiKey: "AIzaSyDsSzWdutGXPWRWdncnoDxYEn4wjDxf1Tw",
  authDomain: "geocaching-3f852.firebaseapp.com",
  databaseURL: "https://geocaching-3f852.firebaseio.com",
  projectId: "geocaching-3f852",
  storageBucket: "geocaching-3f852.appspot.com",
  messagingSenderId: "661601555301"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LugarPage,
    PerfilPage,
    AboutPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LugarPage,
    PerfilPage,
    AboutPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LugarServices, AuthServices
  ]
})
export class AppModule {
}
