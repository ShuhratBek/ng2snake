import { Component, Input } from '@angular/core';
import { Part, Snake, COLORS } from '../shared/';
import { FruitComponent } from './fruit/';
import { SnakeComponent } from './snake/';

@Component({
    selector: 'game-board',
    template: `
        <div class="row" *ngFor="let col of board; let c=index">
			<div class="column"
			     *ngFor="let row of col; let r=index; trackBy:r"
			     [style.background-color]="setStyling(c, r)"
			>
				<fruit *ngIf="setFruit(c, r)" [type]="fruit.type"></fruit>
				<snake *ngIf="setSnake(c, r)"></snake>
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
    @Input() board: boolean[][];
    @Input() fruit: Part;
    @Input() snake: Snake;
    @Input() isGameOver: boolean;

    setStyling(col: number, row: number) {
        if (this.isGameOver) {
            return COLORS.GAME_OVER;
        }
        // } else if (this.fruit.x === row && this.fruit.y === col) {
        //     return COLORS.FRUIT;
        // } else if (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
        //     return COLORS.SNAKE_HEAD;
        // } else if (this.board[col][row] === true) {
        //     return COLORS.SNAKE_BODY;
        // }
        return COLORS.BOARD;
    }

    setFruit(col: number, row: number) {
        return (this.fruit.x === row && this.fruit.y === col);
    }

    setSnake(col: number, row: number) {
        return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row]);
    }
}
