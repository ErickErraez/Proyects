import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth.guard';
import { RequestComponent } from './modals/request/request.component';
import { ContactComponent } from './contact/contact.component';


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'conversation/:uid', component: ConversationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { }
