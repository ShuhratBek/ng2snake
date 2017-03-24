export class Snake {
    size: number = this.canvas.width / 40;
    x: number = 0;
    y: number = 0;
    color = '#0F0';
    direction = 'left';
    sections: string[] = [];

    constructor(canvas: any, game: any, food: any) {

    }

    init() {
        this.sections = [];
        this.direction = 'left';
        this.x = this.canvas.width / 2 + this.size / 2;
        this.y = this.canvas.height /2 + this.size / 2;
        for (i = this.x + (5 * this.size); i >= this.x; i-=this.size) {
            this.sections.push(i + ',' + this.y);
        }
    }

    move() {
        switch(this.direction) {
            case 'up':
                this.y -= this.size;
                break;
            case 'down':
                this.y += this.size;
                break;
            case 'left':
                this.x -= this.size;
                break;
            case 'right':
                this.x += this.size;
                break;
        }
        this.checkCollision();
        this.checkGrowth();
        this.sections.push(this.x + ',' + this.y);
    }

    draw() {
        for (i = 0; i < this.sections.length; i++) {
            this.drawSection(this.sections[i].split(','));
        }
    }

    drawSection(section: string[]) {
        this.game.drawBox(parseInt(section[0]), parseInt(section[1]), this.size, this.color);
    }

    checkCollision() {
        if (this.isCollision(this.x, this.y) === true) {
            this.game.stop();
        }
    }

    isCollision(x, y) {
        if (x < this.size/2 ||
            x > this.canvas.width ||
            y < this.size/2 ||
            y > this.canvas.height ||
            this.sections.indexOf(x+','+y) >= 0) {
            return true;
        }
    }

    checkGrowth() {
        if (this.x == this.food.x && this.y == this.food.y) {
            this.game.score++;
            if (this.game.score % 5 == 0 && this.game.fps < 60) {
                this.game.fps++;
            }
            this.food.set();
        } else {
            this.sections.shift();
        }
    }
}
