import { Component } from '@angular/core';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    selector: 'snake',
    template: `<md-icon svgIcon="circle"></md-icon>`,
    styles: [':host{ color: #CDDC39; }'],
    directives: [MD_ICON_DIRECTIVES]
})
export class SnakeComponent {

}
