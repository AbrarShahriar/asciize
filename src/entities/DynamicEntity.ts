import { MAP_SIZE } from "../constants";
import { Coords, IEntity } from "../types";
import Entity from "./BaseEntity";

export default class DynamicEntity extends Entity {
  MAP_HEIGHT: number;
  MAP_WIDTH: number;

  constructor(obj: IEntity) {
    super(obj);
    this.MAP_HEIGHT = MAP_SIZE;
    this.MAP_WIDTH = MAP_SIZE;
  }

  move({ x, y }: Coords) {
    if (!(0 > this.x + x || this.x + x >= this.MAP_WIDTH)) {
      this.x += x;
    }

    if (!(0 > this.y + y || this.y + y >= this.MAP_HEIGHT)) {
      this.y += y;
    }
  }

  setMapDimension(width: number, height: number) {
    this.MAP_WIDTH = width;
    this.MAP_HEIGHT = height;
  }
}
