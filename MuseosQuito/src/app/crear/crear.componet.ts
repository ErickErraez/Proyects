import { Component } from '@angular/core';
import { LugaresServices } from '../services/lugares.services';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';


@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.css']
})

export class CrearComponent {

    lugar: any = {};
    id: any = null;
    results$: Observable<any>;
    private searchField: FormControl;

    constructor(private root: ActivatedRoute, private http: Http, private lugarServices: LugaresServices) {

        this.id = this.root.snapshot.params['id'];
        console.log(this.id);
        if (this.id != 'new') {
            this.lugarServices.getLugar(this.id)
                .valueChanges().subscribe((lugar) => {
                    this.lugar = lugar;
                });
        }


        const URL = 'https://maps.google.com/maps/api/geocode/json';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
            .switchMap(query => this.http.get(`${URL}?address=${query}`))
            .map(response => response.json())
            .map(response => response.results);
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

    seleccionarDireccion(direccion) {
        console.log(direccion);
        this.lugar.calle = direccion.address_components[1].long_name + ' ' + direccion.address_components[0].long_name;
        this.lugar.ciudad = direccion.address_components[2].long_name;
        this.lugar.pais = direccion.address_components[5].long_name;
    }

}
