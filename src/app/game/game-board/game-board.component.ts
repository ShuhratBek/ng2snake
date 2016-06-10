import { Component } from '@angular/core';
import { FruitComponent } from './fruit/';
import { SnakeComponent } from './snake/';
import { GameService } from '../shared/';

@Component({
    selector: 'game-board',
    template: `
        <div class="row" *ngFor="let column of board; let y=index">
			<div class="column"
			     *ngFor="let row of column; let x=index; trackBy:x"
			     [style.background-color]="setStyling()">
				<fruit *ngIf="setFruit(y, x)"></fruit>
				<snake *ngIf="setSnake(y, x)"></snake>
			</div>
		</div>`,
    styles: [
        '.row { height: 26px;}',
        '.column { border: 1px dotted #455A64; width: 24px; height: 24px; display: inline-block;}'
    ],
    directives: [
        FruitComponent,
        SnakeComponent
    ]
})
export class GameBoardComponent {
    board: boolean[][];

    constructor(private gameService: GameService) {
        this.board = this.gameService.board;
    }

    setStyling() {
        return this.gameService.getStyling();
    }

    setFruit(col: number, row: number) {
        return this.gameService.getFruit(col, row);
    }

    setSnake(col: number, row: number) {
        return this.gameService.getSnake(col, row);
    }
}
