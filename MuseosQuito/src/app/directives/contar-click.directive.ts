import { Direct } from 'protractor/built/driverProviders';
import { HostListener, Directive, HostBinding } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'li[contar-clicks]'

})

export class ContarClicksDirective {
    clickN = 0;
    @HostBinding('style.opacity') opacity = .1;

    @HostListener('click', ['$event.target']) onclick(btn) {
        console.log('a', btn, 'numero de clicks: ', this.clickN++);
        this.opacity += .1;
    }

}
