import { Component, Input } from '@angular/core';
import { COLORS } from '../game.constant';
import { Part, ISnake } from '../game';
import { Fruit } from './fruit/fruit.component';
import { Snake } from './snake/snake.component';

@Component({
    selector: 'game-board',
    template: `
        <div class="row" *ngFor="let col of board; let c=index">
			<div class="column"
			     *ngFor="let row of col; let r=index; trackBy:r"
			     [style.background-color]="setStyling(c, r)"
			>
				<fruit *ngIf="setFruit(c, r)" [type]="fruit.type"></fruit>
				<snake *ngIf="setSnake(c, r)" [part]="getSnakePart(c, r)"></snake>
			</div>
		</div>`,
    directives: [
        Fruit,
        Snake
    ]
})
export class GameBoard {
    @Input() board: boolean[][];
    @Input() fruit: Part;
    @Input() snake: ISnake;
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
        if (this.fruit.x === row && this.fruit.y === col) {
            return true;
        }
        return false;
    }

    setSnake(col: number, row: number) {
        if (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
            return true;
        } else if (this.board[col][row] === true) {
            return true;
        }
        return false;
    }

    getSnakePart(col: number, row: number) {
        if (this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
            return 'snake-head';
        } else if (this.snake.parts.length > 0 && this.snake.parts[this.snake.parts.length - 1].x === row && this.snake.parts[this.snake.parts.length - 1].y === col) {
            return 'snake-tail';
        } else if (this.snake.parts.length > 0 && this.board[col][row] === true) {
            return 'snake-body';
        }
    }
}
