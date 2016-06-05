import { Component, Input } from '@angular/core';
import { COLORS } from './game.constant';
import { Part, ISnake } from './game.d';
import { Fruit } from './fruit.component';

@Component({
    selector: 'game-board',
    template: `
        <div class="row" *ngFor="let col of board; let c=index">
			<div class="column"
			     *ngFor="let row of col; let r=index; trackBy:r"
			     [style.background-color]="setStyling(c, r)"
			>
				<fruit *ngIf="setFruit(c, r)" [type]="fruit.type"></fruit>
				<md-icon svgIcon="snake-head" *ngIf="setSnakeHead(c, r)"></md-icon>
			</div>
		</div>`,
    directives: [Fruit]
})
export class GameBoard {
    @Input() board: boolean[][];
    @Input() fruit: Part;
    @Input() snake: ISnake;
    @Input() isGameOver: boolean;

    constructor() {
        // this.fruit.x = 0;
        // this.fruit.y = 0;
    }

    setStyling(col: number, row: number) {
        if (this.isGameOver)  {
            return COLORS.GAME_OVER;
        // } else if (this.fruit.x === row && this.fruit.y === col) {
        //     return COLORS.FRUIT;
        } else if (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
            return COLORS.SNAKE_HEAD;
        } else if (this.board[col][row] === true) {
            return COLORS.SNAKE_BODY;
        }
        return COLORS.BOARD;
    }

    setFruit(col: number, row: number) {
        if (this.fruit.x === row && this.fruit.y === col) {
            return true;
        }
        return false;
    }

    setSnakeHead(col: number, row: number) {
        if (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
            return true;
        }
        return false;
    }
}
