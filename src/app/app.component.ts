import { Component } from '@angular/core';
import { Game }  from './game/';
import { tpl } from './app.tpl';

@Component({
    selector: 'app',
    template: tpl,
    directives: [
        Game
    ]
})
export class App {

}
