import { Component } from '@angular/core';
import { LugaresServices } from '../services/lugares.services';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.css']
})

export class CrearComponent {

    lugar: any = {};

    id: any = null;

    constructor(private root: ActivatedRoute, private lugarServices: LugaresServices) {

        this.id = this.root.snapshot.params['id'];
        console.log(this.id);
        if (this.id != 'new') {
            this.lugarServices.getLugar(this.id)
                .valueChanges().subscribe((lugar) => {
                    this.lugar = lugar;
                });
        }

    }

    regresar() {
        this.lugar = {};
    }

    guardarLugar() {
        var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
        this.lugarServices.obtenerGeoData(direccion)
            .subscribe((result) => {
                this.lugar.lat = result.json().results[0].geometry.location.lat;
                this.lugar.lng = result.json().results[0].geometry.location.lng;

                if (this.id != 'new') {
                    this.lugarServices.editarLugar(this.lugar);
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Negocio editado con exito!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    this.lugar.id = Date.now();
                    this.lugarServices.guardarLugar(this.lugar);
                    swal({
                        position: 'top-end',
                        type: 'success',
                        title: 'Negocio guardado con exito!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                this.lugar = {};
            });
    }

}
