import { Component, Input } from '@angular/core';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    selector: 'snake',
    template: `<md-icon svgIcon="{{part}}" [class.rotate90]="{{}}"></md-icon>`,
    directives: [MD_ICON_DIRECTIVES]
})
export class Snake {
    @Input() part: string;
}
