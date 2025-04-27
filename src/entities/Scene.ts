import { generateIdFor } from "../helper";
import { IScene } from "../types";
import Player from "./dynamics/player";
import StaticEntity from "./StaticEntity";

export default class Scene {
  MAP_WIDTH: number;
  MAP_HEIGHT: number;
  player: Player | null;
  playerStartingX: number;
  playerStartingY: number;
  id: Symbol;
  staticEntities: Map<string, StaticEntity>;
  doorEntities: Map<string, Symbol>;

  constructor({
    mapHeight,
    mapWidth,
    playerStartingX,
    playerStartingY,
    label,
  }: IScene) {
    this.id = generateIdFor(label);
    this.player = null;
    this.MAP_HEIGHT = mapHeight;
    this.MAP_WIDTH = mapWidth;
    this.playerStartingX = playerStartingX;
    this.playerStartingY = playerStartingY;

    this.staticEntities = new Map<string, StaticEntity>();
    this.doorEntities = new Map<string, Symbol>();
  }

  setPlayer(player: Player) {
    this.player = player;
    this.staticEntities.set(
      `(${this.playerStartingY},${this.playerStartingX})`,
      player
    );
  }

  getId(): Symbol {
    return this.id;
  }
}
