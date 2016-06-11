import { Component } from '@angular/core';
import { TOOLBAR_TPL } from './tool-bar.tpl';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { GameService } from '../shared/index';

@Component({
    selector: 'tool-bar',
    template: TOOLBAR_TPL,
    styles: [
        '.fill-space {flex: 1 1 auto;}',
        '[md-fab] {position: absolute; right: 3%; top: 34px; z-index: 1;}',
        '.score {margin-right: 100px;}'
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_ICON_DIRECTIVES
    ]
})
export class ToolBarComponent {
    constructor(private gameService: GameService) {}

    toggle() {
        this.gameService.toggle();
    }

    isStarted() {
        return this.gameService.isStarted;
    }

    score() {
        return this.gameService.score;
    }

    fruitType() {
        return this.gameService.fruit.type;
    }
}
