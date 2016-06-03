import { Component } from '@angular/core';
import { template } from './game.tpl';
import * as _ from 'lodash';
import { BOARD_SIZE, DIRECTIONS, COLORS } from './game.constant';
import { Snake } from './snake';
import { Fruit } from './fruit';

export interface IParts {
    x: number;
    y: number;
}

@Component({
    selector: 'game',
    template: template
})
export class Game {
    score: number;
    interval: number;
    tempDirection: number;
    isGameOver: boolean;
    board: Array[][];
    snake: Snake;
    fruit: Fruit;

    constructor() {
        this.score = 0;
        this.setupBoard();
    }

    getNewHead() {
        let newHead: IParts = _.cloneDeep(this.snake.parts[0]);

        // Update Location
        if (this.tempDirection === DIRECTIONS.LEFT) {
            newHead.x -= 1;
        } else if (this.tempDirection === DIRECTIONS.RIGHT) {
            newHead.x += 1;
        } else if (this.tempDirection === DIRECTIONS.UP) {
            newHead.y -= 1;
        } else if (this.tempDirection === DIRECTIONS.DOWN) {
            newHead.y += 1;
        }
        return newHead;
    }

    boardCollision(part: IParts) {
        return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
    }

    selfCollision(part: IParts) {
        return this.board[part.y][part.x] === true;
    }

    fruitCollision(part: IParts) {
        return part.x === this.fruit.x && part.y === this.fruit.y;
    }

    resetFruit() {
        var x = Math.floor(Math.random() * BOARD_SIZE);
        var y = Math.floor(Math.random() * BOARD_SIZE);

        if (this.board[y][x] === true) {
            return this.resetFruit();
        }
        this.fruit = {x: x, y: y};
    }

    eatFruit() {
        this.score++;

        // Grow by 1
        var tail = _.cloneDeep(this.snake.parts[this.snake.parts.length-1]);
        this.snake.parts.push(tail);
        this.resetFruit();

        if (this.score % 5 === 0) {
            this.interval -= 15;
        }
    }

    gameOver() {
        this.isGameOver = true;

        $timeout(function() {
            this.isGameOver = false;
        },500);

        this.setupBoard();
    }

    setupBoard() {
        this.board = [];
        for (var i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = [];
            for (var j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = false;
            }
        }
    }
}