import * as _ from 'lodash/index';
import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular2-material/icon';
import { GameService } from './shared/index';
import { GameBoardComponent }  from './game-board/index';
import { ToolBarComponent }  from './tool-bar/index';
import { FooterComponent }  from './footer/index';

@Component({
    selector: 'app',
    template: `
        <tool-bar></tool-bar>
        <md-content class="container">
            <game-board></game-board>
        </md-content>
        <footer></footer>`,
    directives: [
        GameBoardComponent,
        ToolBarComponent,
        FooterComponent
    ],
    providers: [
        MdIconRegistry,
        GameService
    ]
})
export class AppComponent {
    constructor(mdIconRegistry: MdIconRegistry, private gameService: GameService) {
        _(this.gameService.fruitType).each((value: string) => {
            mdIconRegistry.addSvgIcon(value, './icons/' + value + '.svg');
        });

        mdIconRegistry.addSvgIcon('play', './icons/play.svg');
        mdIconRegistry.addSvgIcon('stop', './icons/stop.svg');
        mdIconRegistry.addSvgIcon('circle', './icons/circle.svg');
    }
}
