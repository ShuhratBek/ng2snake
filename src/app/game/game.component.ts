import * as _ from 'lodash/index';
import { Component } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { Part, Fruit, Snake, BOARD_SIZE, DIRECTIONS } from './shared/';
import { GameBoardComponent }  from './game-board/';
import { ToolBarComponent }  from './tool-bar/';
import { GAME_TPL } from './game.tpl';

@Component({
    selector: 'game',
    template: GAME_TPL,
    styles: ['.score{background-color: #90A4AE; padding: 10px 20px; border-radius: 20px; text-transform: uppercase;}'],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_ICON_DIRECTIVES,
        GameBoardComponent,
        ToolBarComponent
    ],
    providers: [ MdIconRegistry ]
})
export class GameComponent {
    board: boolean[][];
    snake: Snake;
    fruit: Fruit;
    isGameOver: boolean;
    isStarted: boolean;
    fruitType: Array<string>;
    private interval: number;
    private tempDirection: number;
    private score: number;

    constructor(mdIconRegistry: MdIconRegistry) {
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
        _(this.fruitType).each((value: string) => {
            mdIconRegistry.addSvgIcon(value, './icons/' + value + '.svg');
        });

        mdIconRegistry.addSvgIcon('play', './icons/play.svg');
        mdIconRegistry.addSvgIcon('stop', './icons/stop.svg');

        this.score = 0;
        this.setupBoard();

        window.addEventListener('keyup', (e: any) => {
            if (e.keyCode === DIRECTIONS.LEFT && this.snake.direction !== DIRECTIONS.RIGHT) {
                this.tempDirection = DIRECTIONS.LEFT;
            } else if (e.keyCode === DIRECTIONS.UP && this.snake.direction !== DIRECTIONS.DOWN) {
                this.tempDirection = DIRECTIONS.UP;
            } else if (e.keyCode === DIRECTIONS.RIGHT && this.snake.direction !== DIRECTIONS.LEFT) {
                this.tempDirection = DIRECTIONS.RIGHT;
            } else if (e.keyCode === DIRECTIONS.DOWN && this.snake.direction !== DIRECTIONS.UP) {
                this.tempDirection = DIRECTIONS.DOWN;
            }
        });
    }

    update() {
        let self: GameComponent = this;
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

    getNewHead() {
        let newHead: Part = _.cloneDeep(this.snake.parts[0]);

        // update Location
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

    boardCollision(part: Part) {
        return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
    }

    selfCollision(part: Part) {
        return this.board[part.y][part.x] === true;
    }

    fruitCollision(part: Part) {
        return part.x === this.fruit.x && part.y === this.fruit.y;
    }

    eatFruit() {
        this.score++;

        // grow by 1
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

    gameOver() {
        this.isGameOver = true;

        setTimeout(() => {
            this.isGameOver = false;
        }, 500);

        this.isStarted = false;

        this.setupBoard();
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
            direction: DIRECTIONS.LEFT,
            parts: [{
                x: -1,
                y: -1
            }]
        };
    }

    start() {
        this.isStarted = true;
        this.score = 0;
        this.snake.direction = DIRECTIONS.LEFT;
        this.snake.parts = [];
        this.tempDirection = DIRECTIONS.LEFT;
        this.isGameOver = false;
        this.interval = 150;

        // set up initial snake
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
}
