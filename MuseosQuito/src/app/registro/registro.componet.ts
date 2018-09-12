import { Component } from '@angular/core';
import { AutorizacionServices } from '../services/autorizacion.services';
import { Alert } from 'selenium-webdriver';
import swal from 'sweetalert2';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

    registro: any = {};

    constructor(private autorizacionService: AutorizacionServices) {

    }

    registrar() {
        if (this.registro.password.length < 6) {
            swal({
                type: 'error',
                title: 'Se encontro un error!'

            });
            document.getElementsByName('test')[0].innerText = "Error la contraseña debe tener minimo 6 caracteres";
        } else {

            this.autorizacionService.registro(this.registro.email, this.registro.password);

        }
    }


}
