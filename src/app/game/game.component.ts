import { Component } from '@angular/core';

@Component ({
    selector: 'game',
    template: require('./game.component.html'),
    styles: [require('./game.component.scss')]
})
export class GameComponent {
    score = 0;
    fps = 8;
    over = false;
    message: string;

    start() {
        this.over = false;
        this.message = null;
        this.score = 0;
        this.fps = 8;
        snake.init();
        food.set();
    }

    stop() {
        this.over = true;
        this.message = 'GAME OVER - PRESS SPACEBAR';
    }

    drawBox(x, y, size, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x - (size / 2), y - (size / 2));
        context.lineTo(x + (size / 2), y - (size / 2));
        context.lineTo(x + (size / 2), y + (size / 2));
        context.lineTo(x - (size / 2), y + (size / 2));
        context.closePath();
        context.fill();
    }

    drawScore() {
        context.fillStyle = '#999';
        context.font = (canvas.height) + 'px Impact, sans-serif';
        context.textAlign = 'center';
        context.fillText(this.score, canvas.width/2, canvas.height  * .9);
    }

    drawMessage() {
        if (this.message !== null) {
            context.fillStyle = '#00F';
            context.strokeStyle = '#FFF';
            context.font = (canvas.height / 10) + 'px Impact';
            context.textAlign = 'center';
            context.fillText(this.message, canvas.width/2, canvas.height/2);
            context.strokeText(this.message, canvas.width/2, canvas.height/2);
        }
    }

    resetCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
