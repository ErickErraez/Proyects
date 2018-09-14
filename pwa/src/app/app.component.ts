import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotesServices} from '../services/notes.services';
import {MatSnackBar} from '@angular/material';
import {AuthService} from "../services/auth.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NotesBook';
  panelOpenState = false;
  categorias: any = ['Trabajo', 'Personal'];
  nota: any = {};
  notas: any = [];
  loggedIn = false;
  logUser: any = null;

  constructor(private swUpdate: SwUpdate, private noteService: NotesServices, public snackBar: MatSnackBar, private authService: AuthService) {
    this.authService.isLogged()
      .subscribe((response) => {
        if (response && response.uid) {
          this.loggedIn = true;
          setTimeout(() => {
            this.logUser = this.authService.getUser().currentUser.email;
          }, 500);

        } else {
          this.loggedIn = false;
        }
      }, (error) => {
        this.loggedIn = false;
      });

    this.noteService.getNotes().valueChanges()
      .subscribe((fbNotas) => {
        this.notas = fbNotas;
        console.log(this.notas);
      });

  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  guardarNota() {

    if (!this.nota.id) {
      this.nota.id = Date.now();
    }
    console.log(this.nota);
    this.noteService.createNote(this.nota).then(() => {
      this.nota = {};
      this.snackBar.open('Nota Creada con Exito!', null, {
        duration: 2000,
      });
    });
  }

  SelecionarNota(nota) {
    this.nota = nota;
  }


  Login() {
    this.authService.loginFacebook();
  }

  Logout() {
    this.authService.logout();
  }


}
