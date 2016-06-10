import { Component } from '@angular/core';
import { GameComponent, GameService }  from './game/';

@Component({
    selector: 'app',
    template: '<game></game>',
    directives: [
        GameComponent
    ],
    providers: [ GameService ]
})
export class App {

}
