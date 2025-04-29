import { generateIdFor } from "../helper";
import { IScene } from "../types";
import Player from "./dynamics/player";
import StaticEntity from "./StaticEntity";

export default class Scene {
  MAP_WIDTH: number;
  MAP_HEIGHT: number;
  player: Player | null;
  id: Symbol;
  staticEntities: Map<string, StaticEntity>;

  constructor({ mapHeight, mapWidth, label }: IScene) {
    this.id = generateIdFor(label);
    this.player = null;
    this.MAP_HEIGHT = mapHeight;
    this.MAP_WIDTH = mapWidth;

    this.staticEntities = new Map<string, StaticEntity>();
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  getId(): Symbol {
    return this.id;
  }
}
