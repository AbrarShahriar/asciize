import { IScene } from "../types";
import Player from "./dynamics/player";
import StaticEntity from "./StaticEntity";

export default class Scene {
  MAP_WIDTH: number;
  MAP_HEIGHT: number;
  player: Player | null;
  playerStartingX: number;
  playerStartingY: number;
  staticEntities: Map<string, StaticEntity>;

  constructor({
    mapHeight,
    mapWidth,
    playerStartingX,
    playerStartingY,
  }: IScene) {
    this.player = null;
    this.MAP_HEIGHT = mapHeight;
    this.MAP_WIDTH = mapWidth;
    this.playerStartingX = playerStartingX;
    this.playerStartingY = playerStartingY;

    this.staticEntities = new Map<string, StaticEntity>();
  }

  setPlayer(player: Player) {
    this.player = player;
    this.staticEntities.set(
      `(${this.playerStartingX},${this.playerStartingY})`,
      player
    );
  }
}
