import { Coords, IDoor, Rotation } from "../../types.d";
import Player from "../dynamics/player";
import SceneManager from "../SceneManager";
import StaticEntity from "../StaticEntity";

export default class Door extends StaticEntity {
  destination: Symbol;
  destinationCoords: Coords;
  rotation;

  constructor({ x, y, destination, destinationCoords, rotation }: IDoor) {
    super({ x, y, char: "^" });

    this.destination = destination;
    this.destinationCoords = destinationCoords;
    this.rotation = rotation;

    switch (rotation) {
      case Rotation.TOP:
        this.char = "^";
        break;
      case Rotation.BOTTOM:
        this.char = "v";
        break;
      case Rotation.LEFT:
        this.char = "<";
        break;
      case Rotation.RIGHT:
        this.char = ">";
        break;

      default:
        break;
    }
  }

  /**
   * Sets the active scene using the door's `destination` prop, updates the players `Coord` based on the door's `destinationCoords`, updates the players movement boundary, adds the player to the active scene's screen.
   * @param sceneManager
   * @param player
   */
  enter(sceneManager: SceneManager, player: Player) {
    sceneManager.setActiveSceneById(this.destination);
    const activeScene = sceneManager.getActiveScene();

    player.setPos({
      x: this.destinationCoords.x,
      y: this.destinationCoords.y,
    });
    player.setMapDimension(activeScene.MAP_WIDTH, activeScene.MAP_HEIGHT);
    activeScene.staticEntities.set(player.getPosKey() as string, player);
  }
}
