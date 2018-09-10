import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class LugaresServices {
    lugares: any = [
        { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia', description: 'ESTA ES LA DESCRIPCION 1' },
        { id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'ESTA ES LA DESCRIPCION 2' },
        { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices', description: 'ESTA ES LA DESCRIPCION 3' },
        { id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Suhiroll', description: 'ESTA ES LA DESCRIPCION 4' },
        { id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'ESTA ES LA DESCRIPCION 5' },
        { id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el Clavo', description: 'ESTA ES LA DESCRIPCION 6' }
    ];

    constructor(private aFDB: AngularFireDatabase, private http: Http) {

    }

    public getLugares() {

        return this.aFDB.list('lugares/');
    }


    public searchPlaces(id) {

        return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
    }

    public guardarLugar(lugar) {
        this.aFDB.database.ref('lugares/' + lugar.id).set(lugar);
    }

    public editarLugar(lugar) {
        this.aFDB.database.ref('lugares/' + lugar.id).set(lugar);
    }

    public obtenerGeoData(direccion) {
        //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + direccion);
    }

    public getLugar(id) {
        return this.aFDB.object('lugares/' + id);
    }
}
