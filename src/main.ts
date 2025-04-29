import Player from "./entities/dynamics/player";
import BFS from "./entities/pathfinding/bfs";
import SceneManager from "./entities/SceneManager";
import StaticEntity from "./entities/StaticEntity";
import Door from "./entities/statics/Door";
import Floor from "./entities/statics/Floor";
import { select } from "./helper";
import { MAP } from "./nodes";

class GameManager {
  MAP_EL: HTMLElement;
  player: Player;
  sceneManager: SceneManager;
  bfs: BFS;

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

    document.addEventListener("keydown", (e) =>
      this.registerKeyboardEventHandlers(e)
    );

    this.bfs = new BFS({
      dimension: activeScene.MAP_HEIGHT,
      obstacles: activeScene.staticEntities,
    });
  }

  registerKeyboardEventHandlers(event: KeyboardEvent) {
    console.log(event.key);

    let activeScene = this.sceneManager.getActiveScene();

    // Delete the player from the screen at the current position
    activeScene.staticEntities.delete(this.player.getPosKey());

    // Get the player position before the update
    const prevPos = this.player.getPos();

    // Based on key pressed, update the players position
    this.player.handleUserInput(event);

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

    let a = this.bfs.solve({ x: 19, y: 19 }, this.player.getPos());
    a.path.forEach((el, i) => {
      setTimeout(() => {
        activeScene.staticEntities.set(
          `(${el.y},${el.x})`,
          new StaticEntity({ x: el.x, y: el.y, char: "1" })
        );
      }, 500 + i * 100);
    });
    setTimeout(() => {}, 2000);
    this.bfs.reset();
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

// Enemy navigation BFS test
// const dimension = 6;
// const walls = new Map<string, string>();
// const addWallAt = ({ x, y }: { x: number; y: number }) =>
//   walls.set(`(${y},${x})`, "#");
// addWallAt({ x: 1, y: 1 });
// addWallAt({ x: 1, y: 2 });
// addWallAt({ x: 1, y: 3 });
// addWallAt({ x: 2, y: 2 });
// addWallAt({ x: 3, y: 2 });
// addWallAt({ x: 3, y: 3 });
// addWallAt({ x: 4, y: 0 });
// addWallAt({ x: 5, y: 0 });
// addWallAt({ x: 0, y: 5 });
// addWallAt({ x: 1, y: 5 });
// addWallAt({ x: 2, y: 5 });

// const start = { x: 5, y: 1 };
// const target = { x: 5, y: 4 };
// walls.set(`(${start.y},${start.x})`, "x");
// walls.set(`(${target.y},${target.x})`, "o");

// const a = new BFS({ dimension: 6, obstacles: walls });
// a.solve(start, target);

// function render() {
//   console.log(1);

//   MAP.textContent = "";

//   a.path.forEach((el, i) => {
//     setTimeout(() => {
//       walls.set(`(${el.y},${el.x})`, "1");
//     }, 500 + i * 500);
//   });

//   for (let y = 0; y < dimension; y++) {
//     for (let x = 0; x < dimension; x++) {
//       if (walls.get(`(${y},${x})`)) {
//         MAP.textContent += walls.get(`(${y},${x})`) as string;
//       } else {
//         MAP.textContent += ".";
//       }
//     }
//     MAP.textContent += "\n";
//   }
//   requestAnimationFrame(render);
// }

// render();
