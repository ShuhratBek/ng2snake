export interface Part {
    x: number;
    y: number;
}

export interface Fruit extends Part{
    type: string;
}

export interface ISnake {
    direction: number;
    parts: Array<Part>;
}
