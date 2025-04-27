import { IEntity } from "../../types";
import DynamicEntity from "../DynamicEntity";

export default class Player extends DynamicEntity {
  constructor({ x, y }: Omit<IEntity, "char">) {
    super({ x, y, char: "@" });
  }
}
