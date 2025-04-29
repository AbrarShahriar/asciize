import Player from "./entities/dynamics/player";
import SceneManager from "./entities/SceneManager";
import Door from "./entities/statics/Door";
import Floor from "./entities/statics/Floor";
import { select } from "./helper";

class GameManager {
  MAP_EL: HTMLElement;
  player: Player;
  sceneManager: SceneManager;

  constructor(map: HTMLElement) {
    this.MAP_EL = map;
    this.sceneManager = new SceneManager();

    const activeScene = this.sceneManager.getActiveScene();

    this.player = new Player({
      x: 1,
      y: 1,
    });
    this.player.setMapDimension(activeScene.MAP_WIDTH, activeScene.MAP_HEIGHT);
    this.sceneManager.setPlayer(this.player);

    document.addEventListener("keydown", (e) => this.setupInputHandler(e));
  }

  setupInputHandler(event: KeyboardEvent) {
    console.log(event.key);

    let activeScene = this.sceneManager.getActiveScene();

    // Delete the player from the screen at the current position
    activeScene.staticEntities.delete(this.player.getPosKey());

    // Get the player position before the update
    const prevPos = this.player.getPos();

    // Based on key pressed, update the players position
    switch (event.key) {
      case "w":
        this.player.move({ x: 0, y: -1 });
        break;
      case "s":
        this.player.move({ x: 0, y: 1 });
        break;
      case "a":
        this.player.move({ x: -1, y: 0 });
        break;
      case "d":
        this.player.move({ x: 1, y: 0 });
        break;
    }

    // Get the updated position of the player
    const newPos = this.player.getPosKey();

    // Check if any static entity exists at the players updated position
    const entityExistsAtNewPos = activeScene.staticEntities.get(newPos);

    if (entityExistsAtNewPos) {
      // Check if the entity the player is trying to cross is a door
      if (entityExistsAtNewPos instanceof Door) {
        const door = entityExistsAtNewPos;
        door.enter(this.sceneManager, this.player);
        activeScene = this.sceneManager.getActiveScene();
        console.log("Entering, ", door.destination);
        return;
      }

      // If exists, we set the players position back to what it was before the update
      this.player.setPos(prevPos);

      // We show the player on the screen where he was before the update
      activeScene.staticEntities.set(this.player.getPosKey(), this.player);
    } else {
      // If it doesnt, we use the players updated position and show it on the screen
      activeScene.staticEntities.set(this.player.getPosKey(), this.player);
    }
  }

  gameLoop() {
    const activeScene = this.sceneManager.getActiveScene();
    this.MAP_EL.textContent = "";
    for (let y = 0; y < activeScene.MAP_HEIGHT; y++) {
      for (let x = 0; x < activeScene.MAP_WIDTH; x++) {
        const entity = activeScene.staticEntities.get(`(${y},${x})`);
        if (entity) {
          this.MAP_EL.textContent += entity.getChar();
        } else {
          this.MAP_EL.textContent += new Floor({ x, y }).getChar();
        }
      }
      this.MAP_EL.textContent += "\n";
    }
    requestAnimationFrame(() => this.gameLoop());
  }
}

const game = new GameManager(select("#map"));
game.gameLoop();
