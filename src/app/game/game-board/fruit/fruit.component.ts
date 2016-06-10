import { Component } from '@angular/core';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { GameService } from '../../shared';

@Component({
    selector: 'fruit',
    template: `<md-icon svgIcon="{{type}}"></md-icon>`,
    directives: [MD_ICON_DIRECTIVES]
})
export class FruitComponent {
    type: string;

    constructor(private gameService: GameService) {
        this.type = this.gameService.fruit.type;
    }
}
