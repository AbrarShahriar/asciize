import { IEntity } from "../../types";
import StaticEntity from "../StaticEntity";

export default class Door extends StaticEntity {
  constructor({ x, y }: Omit<IEntity, "char">) {
    super({ x, y, char: "^" });
  }
}
