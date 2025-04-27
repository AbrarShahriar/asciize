import Player from "./entities/dynamics/player";
import Scene from "./entities/Scene";
import Door from "./entities/statics/Door";
import Floor from "./entities/statics/Floor";
import Wall from "./entities/statics/Wall";
import { select } from "./helper";

const room = new Scene({
  mapHeight: 10,
  mapWidth: 10,
  playerStartingX: 4,
  playerStartingY: 9,
});
for (let y = 0; y < room.MAP_HEIGHT; y++) {
  room.staticEntities.set(`(${y},0)`, new Wall({ x: 0, y }));
  room.staticEntities.set(
    `(${y},${room.MAP_HEIGHT - 1})`,
    new Wall({ x: room.MAP_HEIGHT - 1, y })
  );
}

const mainScene = new Scene({
  mapHeight: 20,
  mapWidth: 20,
  playerStartingX: 1,
  playerStartingY: 1,
});
for (let y = 2; y < 6; y++) {
  for (let x = 5; x < 14; x++) {
    mainScene.staticEntities.set(`(${y},${x})`, new Wall({ x, y }));
  }
}
mainScene.staticEntities.set("(5,9)", new Door({ x: 5, y: 9 }));

// const scenes = new Map<string, Scene>()
// scenes.set("(5,9)", room)
// scenes.set("(9,4)", mainScene)

// Render map
class GameManager {
  MAP_EL: HTMLElement;
  player: Player;
  scene: Scene;

  constructor(map: HTMLElement) {
    this.MAP_EL = map;
    this.scene = room;

    this.player = new Player({
      x: this.scene.playerStartingX,
      y: this.scene.playerStartingY,
    });
    this.player.setMapDimension(this.scene.MAP_WIDTH, this.scene.MAP_HEIGHT);
    this.scene.staticEntities.set(this.player.getPosKey(), this.player);

    document.addEventListener("keydown", (e) => this.setupInputHandler(e));
  }

  setupInputHandler(event: KeyboardEvent) {
    console.log(event.key);

    // Delete the player from the screen at the current position
    this.scene.staticEntities.delete(this.player.getPosKey());

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
    const entityExistsAtNewPos = this.scene.staticEntities.get(newPos);

    if (entityExistsAtNewPos) {
      // Check if the entity the player is trying to cross is a door
      if (entityExistsAtNewPos instanceof Door) {
      }

      // If exists, we set the players position back to what it was before the update
      this.player.setPos(prevPos);

      // We show the player on the screen where he was before the update
      this.scene.staticEntities.set(this.player.getPosKey(), this.player);
    } else {
      // If it doesnt, we use the players updated position and show it on the screen
      this.scene.staticEntities.set(this.player.getPosKey(), this.player);
    }
  }

  gameLoop() {
    this.MAP_EL.textContent = "";
    for (let y = 0; y < this.scene.MAP_HEIGHT; y++) {
      for (let x = 0; x < this.scene.MAP_WIDTH; x++) {
        const entity = this.scene.staticEntities.get(`(${y},${x})`);
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
