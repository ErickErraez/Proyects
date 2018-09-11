import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/lib/linkify-string';

@Pipe({ name: 'prueba' })

export class LinkifystrPipe implements PipeTransform {
    transform(str: String): String {
        return str ? linkifyStr(str, { target: '_system' }) : str;
    }
}
