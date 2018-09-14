import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule, MatIconModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {NotesServices} from '../services/notes.services';
import {AuthService} from '../services/auth.services';
import {MessagingService} from "../services/messagin.services";


const config: any = {
  apiKey: 'AIzaSyDhycKmf1rP8qP2XZym1HjI1oj0KfVVxf4',
  authDomain: 'notasproyect.firebaseapp.com',
  databaseURL: 'https://notasproyect.firebaseio.com',
  projectId: 'notasproyect',
  storageBucket: 'notasproyect.appspot.com',
  messagingSenderId: '552866892750'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    [BrowserAnimationsModule],
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [NotesServices, AuthService, MessagingService],
  bootstrap:
    [AppComponent]
})

export class AppModule {
}
