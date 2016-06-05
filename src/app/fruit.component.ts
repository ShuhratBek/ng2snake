import { Component, Input } from '@angular/core';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    selector: 'fruit',
    template: `<md-icon svgIcon="{{type}}"></md-icon>`,
    directives: [MD_ICON_DIRECTIVES]
})
export class Fruit {
    @Input() type: string;

    constructor() {

    }
}
