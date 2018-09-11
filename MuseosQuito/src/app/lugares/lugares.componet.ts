import { Component } from '@angular/core';
import { LugaresServices } from '../services/lugares.services';
import swal from 'sweetalert2';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-lugares',
    templateUrl: './lugares.component.html',
    styleUrls: ['./lugares.component.css'],
    animations: [
        trigger('animable', [
            state('inicial', style({
                opacity: 0,
                color: 'red',
                transform: 'rotate3D(0,0,0,0deg)'
            })),
            state('final', style({
                opacity: 1,
                color: 'yellow',
                transform: 'rotate3D(10,20,30,70deg)'
            })),
            transition('inicial => final', animate(5000)),
            transition('final => inicial', animate(2500)),
        ])
    ]
})

export class LugaresComponent {
    title = 'MuseosQuito';
    lat = -0.1967548;
    lng = -78.4817986;
    lugares = null;
    state = 'final';

    animar() {
        // tslint:disable-next-line:no-unused-expression
        this.state = (this.state === 'final') ? 'inicial' : 'final';
    }
    constructor(private lugaresServices: LugaresServices) {

        lugaresServices.getLugares()
            .subscribe(lugares => {
                // tslint:disable-next-line:no-debugger
                // debugger; --> E ste comando permite detener la Ejecucion del programa
                this.lugares = lugares;
                var me = this;
                me.lugares = Object.keys(me.lugares).map(function(key) { return me.lugares[key]; });

            }, error => {
                console.log(error);
                swal({
                    type: 'error',
                    title: 'Se encontro un error!',
                    text: 'Tipo de error: ' + error.statusText
                });
            });

    }
}
