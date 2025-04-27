import { IEntity } from "../../types";
import Entity from "../BaseEntity";

export default class Tree extends Entity {
  constructor({ x, y }: Omit<IEntity, "char">) {
    super({ x, y, char: "T" });
  }
}
