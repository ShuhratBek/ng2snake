import { Component } from '@angular/core';
import { GameComponent }  from './game/';

@Component({
    selector: 'app',
    template: '<game></game>',
    directives: [
        GameComponent
    ]
})
export class App {

}
