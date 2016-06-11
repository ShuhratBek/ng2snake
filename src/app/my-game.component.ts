import * as _ from 'lodash/index';
import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { GameService } from './shared/index';
import { GameBoardComponent }  from './game-board/index';
import { ToolBarComponent }  from './tool-bar/index';
import { GAME_TPL } from './my-game.tpl';

@Component({
    selector: 'my-game',
    template: GAME_TPL,
    styles: ['.copyright {color: #607D8B}'],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        GameBoardComponent,
        ToolBarComponent
    ],
    providers: [
        MdIconRegistry,
        GameService
    ]
})
export class MyGameComponent {
    constructor(mdIconRegistry: MdIconRegistry, private gameService: GameService) {
        _(this.gameService.fruitType).each((value: string) => {
            mdIconRegistry.addSvgIcon(value, './icons/' + value + '.svg');
        });

        mdIconRegistry.addSvgIcon('play', './icons/play.svg');
        mdIconRegistry.addSvgIcon('stop', './icons/stop.svg');
        mdIconRegistry.addSvgIcon('circle', './icons/circle.svg');
    }
}
