import * as _ from 'lodash/index';
import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { GameService } from './shared/';
import { GameBoardComponent }  from './game-board/';
import { ToolBarComponent }  from './tool-bar/';
import { GAME_TPL } from './game.tpl';

@Component({
    selector: 'game',
    template: GAME_TPL,
    styles: ['.score{background-color: #90A4AE; padding: 10px 20px; border-radius: 20px; text-transform: uppercase;}'],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        GameBoardComponent,
        ToolBarComponent
    ],
    providers: [ MdIconRegistry ]
})
export class GameComponent {
    constructor(mdIconRegistry: MdIconRegistry, private gameService: GameService) {
        _(this.gameService.fruitType).each((value: string) => {
            mdIconRegistry.addSvgIcon(value, './icons/' + value + '.svg');
        });

        mdIconRegistry.addSvgIcon('play', './icons/play.svg');
        mdIconRegistry.addSvgIcon('stop', './icons/stop.svg');
        mdIconRegistry.addSvgIcon('circle', './icons/circle.svg');
    }

    score() {
        return this.gameService.score;
    }
}
