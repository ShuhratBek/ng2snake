import { EventEmitter } from '@angular/core';

export class Food {
    size: number;
    x: number;
    y: number;
    color: string = '#0FF';

    constructor(game: any, snake: any) {

    }

    set(size) {
        this.size = size;
        this.x = (Math.ceil(Math.random() * 10) * size * 4) - size / 2;
        this.y = (Math.ceil(Math.random() * 10) * size * 3) - size / 2;
    }

    draw() {
        this.game.drawBox(this.x, this.y, this.size, this.color);
    }
}
