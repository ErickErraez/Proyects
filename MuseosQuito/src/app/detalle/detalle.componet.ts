import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html'
})

export class DetalleComponent {

    constructor(private root: ActivatedRoute) {
        console.log(this.root.snapshot.params['id']);
        console.log(this.root.snapshot.queryParams['action']);
    }

}
