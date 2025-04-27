import { generateIdFor } from "../helper";
import Player from "./dynamics/player";
import Scene from "./Scene";
import Door from "./statics/Door";
import Wall from "./statics/Wall";

const room = new Scene({
  mapHeight: 10,
  mapWidth: 10,
  playerStartingX: 2,
  playerStartingY: 8,
  label: "Building1",
});
for (let y = 0; y < room.MAP_HEIGHT; y++) {
  room.staticEntities.set(`(${y},0)`, new Wall({ x: 0, y }));
  room.staticEntities.set(
    `(${y},${room.MAP_HEIGHT - 1})`,
    new Wall({ x: room.MAP_HEIGHT - 1, y })
  );
}
room.staticEntities.set("(9,2)", new Door({ x: 2, y: 9 }));
room.doorEntities.set("(9,2)", generateIdFor("City"));

const mainScene = new Scene({
  mapHeight: 20,
  mapWidth: 20,
  playerStartingX: 9,
  playerStartingY: 6,
  label: "City",
});
for (let y = 2; y < 6; y++) {
  for (let x = 5; x < 14; x++) {
    mainScene.staticEntities.set(`(${y},${x})`, new Wall({ x, y }));
  }
}
mainScene.staticEntities.set("(5,9)", new Door({ x: 5, y: 9 }));
mainScene.doorEntities.set("(5,9)", generateIdFor("Building1"));

export default class SceneManager {
  static Scenes: Map<Symbol, Scene>;

  private activeScene: Scene | null;

  player: Player | null;

  constructor() {
    SceneManager.Scenes = new Map<Symbol, Scene>();
    SceneManager.Scenes.set(mainScene.getId(), mainScene);
    SceneManager.Scenes.set(room.getId(), room);

    this.activeScene = room;
    this.player = null;
  }

  setPlayer(player: Player) {
    this.player = player;
    this.activeScene!.setPlayer(this.player as Player);
    this.activeScene!.staticEntities.set(this.player.getPosKey(), this.player);
  }

  getActiveScene(): Scene {
    if (!this.activeScene) {
      throw new Error("No Active Scene Found");
    }
    return this.activeScene;
  }

  setActiveScene(scene: Scene) {
    this.activeScene = scene;

    if (!this.player) throw new Error("Player undefined: setActiveScene");

    this.player.setPos({
      x: this.activeScene.playerStartingX,
      y: this.activeScene.playerStartingY,
    });
    this.player.setMapDimension(
      this.activeScene.MAP_WIDTH,
      this.activeScene.MAP_HEIGHT
    );
    this.activeScene.staticEntities.set(
      this.player.getPosKey() as string,
      this.player
    );
  }

  setActiveSceneById(id: Symbol) {
    const scene = SceneManager.Scenes.get(id);
    if (!scene) throw new Error("No scene found under this ID.");
    this.setActiveScene(scene);
  }
}
