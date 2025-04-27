import { Coords, IEntity } from "../types";

export default class Entity {
  x: number;
  y: number;
  char: string;
  health?: number;

  constructor({ x, y, char, health = Infinity }: IEntity) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.health = health;
  }

  getChar() {
    return this.char;
  }

  getPos(): Coords {
    return { x: this.x, y: this.y };
  }

  getPosKey() {
    return `(${this.y},${this.x})`;
  }

  setPos({ x, y }: Coords) {
    this.x = x;
    this.y = y;
  }
}
