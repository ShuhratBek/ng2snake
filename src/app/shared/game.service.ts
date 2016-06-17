import * as _ from 'lodash/index';
import { Injectable } from '@angular/core';
import { Part, Fruit, Snake, BOARD_SIZE, COLORS, KEYS } from './index';

@Injectable()
export class GameService {
    board: boolean[][];
    snake: Snake;
    fruit: Fruit;
    isStarted: boolean;
    fruitType: Array<string>;
    score: number;
    private isGameOver: boolean;
    private interval: number;
    private tempDirection: number;

    constructor() {
        this.fruitType = [
            'apple',
            'avocado',
            'banana',
            'blueberries',
            'cherries',
            'grapes',
            'lemon',
            'lime',
            'orange',
            'peach',
            'pear',
            'pineapple',
            'pomegranate',
            'raspberry',
            'strawberry',
            'tomato'
        ];

        this.score = 0;
        this.setupBoard();

        window.addEventListener('keyup', (e: any) => {
            switch (e.keyCode) {
                case KEYS.ESC:
                    if (this.isStarted) {
                        this.gameOver();
                    }
                    break;
                case KEYS.SPACE_BAR:
                case KEYS.ENTER:
                    this.toggle();
                    break;
                case KEYS.LEFT:
                    if (this.snake.direction !== KEYS.RIGHT) {
                        this.tempDirection = KEYS.LEFT;
                    }
                    break;
                case KEYS.UP:
                    if (this.snake.direction !== KEYS.DOWN) {
                        this.tempDirection = KEYS.UP;
                    }
                    break;
                case KEYS.RIGHT:
                    if (this.snake.direction !== KEYS.LEFT) {
                        this.tempDirection = KEYS.RIGHT;
                    }
                    break;
                case KEYS.DOWN:
                    if (this.snake.direction !== KEYS.UP) {
                        this.tempDirection = KEYS.DOWN;
                    }
                    break;
            }
        });
    }

    setupBoard() {
        this.board = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            this.board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                this.board[i][j] = false;
            }
        }
        this.fruit = {
            x: -1,
            y: -1,
            type: this.getFruitType()
        };
        this.snake = {
            direction: KEYS.LEFT,
            parts: [{
                x: -1,
                y: -1
            }]
        };
    }

    start() {
        this.isStarted = true;
        this.isGameOver = false;
        this.score = 0;
        this.interval = 150;

        this.snake.direction = KEYS.LEFT;
        this.snake.parts = [];
        this.tempDirection = KEYS.LEFT;

        for (let i: number = 0; i < 5; i++) {
            this.snake.parts.push({x: 10 + i, y: 10});
        }
        this.resetFruit();
        this.update();
    }

    toggle() {
        if (this.isStarted) {
            this.gameOver();
        } else {
            this.start();
        }
    }

    update() {
        let self: GameService = this;
        if (this.isStarted) {
            setTimeout(() => {
                let newHead: Part = self.getNewHead();

                if (self.boardCollision(newHead) || self.selfCollision(newHead)) {
                    return self.gameOver();
                } else if (self.fruitCollision(newHead)) {
                    self.eatFruit();
                }

                // remove tail
                let oldTail: Part = self.snake.parts.pop();
                self.board[oldTail.y][oldTail.x] = false;

                // pop tail to head
                self.snake.parts.unshift(newHead);
                self.board[newHead.y][newHead.x] = true;

                // do it again
                self.snake.direction = self.tempDirection;
                self.update();
            }, this.interval);
        }
    }

    gameOver() {
        this.isGameOver = true;

        setTimeout(() => {
            this.isGameOver = false;
        }, 500);

        this.isStarted = false;

        this.setupBoard();
    }

    getNewHead() {
        let newHead: Part = _.cloneDeep(this.snake.parts[0]);

        // update Location
        if (this.tempDirection === KEYS.LEFT) {
            newHead.x -= 1;
        } else if (this.tempDirection === KEYS.RIGHT) {
            newHead.x += 1;
        } else if (this.tempDirection === KEYS.UP) {
            newHead.y -= 1;
        } else if (this.tempDirection === KEYS.DOWN) {
            newHead.y += 1;
        }
        return newHead;
    }

    boardCollision(part: Part) {
        return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
    }

    selfCollision(part: Part) {
        return this.board[part.y][part.x];
    }

    fruitCollision(part: Part) {
        return part.x === this.fruit.x && part.y === this.fruit.y;
    }

    eatFruit() {
        this.score++;

        let tail: Part = _.cloneDeep(this.snake.parts[this.snake.parts.length - 1]);
        this.snake.parts.push(tail);
        this.resetFruit();

        if (this.score % 5 === 0) {
            this.interval -= 15;
        }
    }

    resetFruit() {
        let x: number = Math.floor(Math.random() * BOARD_SIZE);
        let y: number = Math.floor(Math.random() * BOARD_SIZE);

        if (this.board[y][x]) {
            return this.resetFruit();
        }
        this.fruit = {
            x: x,
            y: y,
            type: this.getFruitType()
        };
    }

    getFruitType() {
        return this.fruitType[_.random(0, this.fruitType.length - 1)];
    }

    getStyling() {
        if (this.isGameOver) {
            return COLORS.GAME_OVER;
        }
        return COLORS.BOARD;
    }

    getFruit(col: number, row: number) {
        return (this.fruit.x === row && this.fruit.y === col);
    }

    getSnake(col: number, row: number) {
        return ((this.snake.parts.length > 0 && this.snake.parts[0].x === row && this.snake.parts[0].y === col) || this.board[col][row]);
    }
}
