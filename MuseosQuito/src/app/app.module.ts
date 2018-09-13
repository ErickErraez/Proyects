import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-click.directive';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.componet';
import { LugaresComponent } from './lugares/lugares.componet';
import { ContactoComponent } from './contacto/contacto.componet';
import { LugaresServices } from './services/lugares.services';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CrearComponent } from './crear/crear.componet';
import { HttpModule } from '@angular/http';
import { LinkifystrPipe } from './pipes/Linkifystr.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.componet';
import { RegistroComponent } from './registro/registro.componet';
import { AutorizacionServices } from './services/autorizacion.services';
import { GuardServices } from './services/guard.services';



const appRoutes: Routes = [
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'crear/:id', component: CrearComponent, canActivate: [GuardServices] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }

];

export const config = {
  apiKey: "AIzaSyDg8lfUQpFt2HhWGVos3zUNRpTFvk0rcSw",
  authDomain: "museosquito-1536348590463.firebaseapp.com",
  databaseURL: "https://museosquito-1536348590463.firebaseio.com",
  projectId: "museosquito-1536348590463",
  storageBucket: "museosquito-1536348590463.appspot.com",
  messagingSenderId: "715386917153"
};

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5Cd6Tiu3oqs69v1GDk5_aTCwOk8B8ZIM'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LugaresServices, AutorizacionServices, GuardServices],

  bootstrap: [AppComponent]
})
export class AppModule { }
