import {BOARD_SIZE, DIRECTIONS, COLORS} from './game.constant';


export interface IParts {
    x: number;
    y: number;
}
export class Snake {
    direction: number;
    parts: Array<IParts>;
    constructor() {
        this.direction = DIRECTIONS.LEFT;
        this.parts = [{
            x: -1,
            y: -1
        }];
    }
}