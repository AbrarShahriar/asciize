import { IEntity } from "../../types";
import DynamicEntity from "../DynamicEntity";

export default class Player extends DynamicEntity {
  constructor({ x, y }: Omit<IEntity, "char">) {
    super({ x, y, char: "@" });
  }

  handleUserInput(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
        this.move({ x: 0, y: -1 });
        break;
      case "s":
        this.move({ x: 0, y: 1 });
        break;
      case "a":
        this.move({ x: -1, y: 0 });
        break;
      case "d":
        this.move({ x: 1, y: 0 });
        break;
    }
  }
}
