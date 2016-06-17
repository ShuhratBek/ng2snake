import { Component } from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { GameService } from '../shared/index';

@Component({
    selector: 'tool-bar',
    template: `
        <md-toolbar color="primary">
            <h4>ng2Snake</h4>
            <span class="fill-space"></span>
            <span class="score">
                <md-icon svgIcon="{{fruitType()}}"></md-icon>
                {{score()}}
            </span>
            <button *ngIf="!isStarted()" md-fab (click)="toggle()">
                <md-icon svgIcon="play"></md-icon>
            </button>
            <button *ngIf="isStarted()" md-fab (click)="toggle()" color="warn">
                <md-icon svgIcon="stop"></md-icon>
            </button>
        </md-toolbar>`,
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
