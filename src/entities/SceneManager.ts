import Player from "./dynamics/player";
import Scene from "./Scene";
import scenes from "../scenes";

/**
 * @module SceneManager
 * Handles all scene management tasks including
 * - Initialization of scenes in memory
 * - Currently active scene management (set, get)
 * - Set scene context i.e. player data
 */
export default class SceneManager {
  static Scenes: Map<Symbol, Scene>;

  private activeScene: Scene | null;

  player: Player | null;

  constructor() {
    SceneManager.Scenes = new Map<Symbol, Scene>();

    scenes.forEach((scene) => SceneManager.Scenes.set(scene.getId(), scene));

    this.activeScene = scenes[0];
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
  }

  setActiveSceneById(id: Symbol) {
    const scene = SceneManager.Scenes.get(id);
    if (!scene) throw new Error("No scene found under this ID.");
    this.setActiveScene(scene);
  }
}
