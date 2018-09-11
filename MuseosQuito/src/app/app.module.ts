import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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



const appRoutes: Routes = [
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'crear/:id', component: CrearComponent }

];

export const firebaseConfig = {
  apiKey: 'AIzaSyDg8lfUQpFt2HhWGVos3zUNRpTFvk0rcSw',
  authDomain: 'museosquito-1536348590463.firebaseapp.com',
  projectId: 'museosquito-1536348590463',
  databaseURL: 'https://museosquito-1536348590463.firebaseio.com',
  storageBucket: 'museosquito-1536348590463.appspot.com',
  messagingSenderId: '715386917153'
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
    LinkifystrPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdIe0_RP3_1E4c1SXDweqjYk-ZmTEAcqI'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LugaresServices],

  bootstrap: [AppComponent]
})
export class AppModule { }
