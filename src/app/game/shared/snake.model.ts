import { Part } from './part.model';

export interface Snake {
    direction: number;
    parts: Array<Part>;
}
