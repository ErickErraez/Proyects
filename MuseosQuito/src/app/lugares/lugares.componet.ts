import { Component } from '@angular/core';
import { LugaresServices } from '../services/lugares.services';

@Component({
    selector: 'app-lugares',
    templateUrl: './lugares.component.html',
    styleUrls: ['./lugares.component.css']
})

export class LugaresComponent {
    title = 'MuseosQuito';
    lat = -0.1967548;
    lng = -78.4817986;
    lugares = null;

    constructor(private lugaresServices: LugaresServices) {

        lugaresServices.getLugares()
            .valueChanges().subscribe(lugares => {
                // tslint:disable-next-line:no-debugger
                // debugger; --> E ste comando permite detener la Ejecucion del programa
                this.lugares = lugares;
            });

    }
}
