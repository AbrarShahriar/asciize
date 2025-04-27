import { IEntity } from "../../types";
import Entity from "../BaseEntity";

export default class Floor extends Entity {
  constructor({ x, y }: Omit<IEntity, "char">) {
    super({ x, y, char: "." });
  }
}
