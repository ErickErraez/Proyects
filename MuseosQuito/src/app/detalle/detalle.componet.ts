import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresServices } from '../services/lugares.services';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html'
})

export class DetalleComponent {


    id = null;
    lugar: any = {};


    constructor(private root: ActivatedRoute, private lugaresServices: LugaresServices) {
        console.log(this.root.snapshot.params['id']);
        console.log(this.root.snapshot.queryParams['action']);
        this.id = this.root.snapshot.params['id'];
        this.lugar = this.lugaresServices.searchPlaces(this.id);
    }

}
