import { Coords } from "../../types";
import Wall from "../statics/Wall";

export default class BFS {
  queue: Coords[] = [];
  visited: Record<string, boolean> = {};
  parents: Record<string, null | Coords> = {};
  path: Coords[] = [];
  dimension: number = 0;
  obstacles: Map<string, unknown> = new Map<string, unknown>();

  constructor({
    dimension,
    obstacles,
  }: {
    dimension: number;
    obstacles: Map<string, unknown>;
  }) {
    this.dimension = dimension;
    this.obstacles = obstacles;
  }

  solve(start: Coords, target: Coords) {
    console.log("SOLVING");

    this.queue.push(start);
    this.visited[`(${start.y},${start.x})`] = true;
    this.parents[`(${start.y},${start.x})`] = null;

    while (this.queue.length > 0) {
      // Fetch the top element from the queue
      const curNode = this.queue.shift();

      // Check if the current node is the target node
      if (curNode?.x == target.x && curNode.y == target.y) {
        // If it is, then we break out of the loop
        console.log("Target found", curNode.x, curNode.y);
        this.path = this.reconstruct(target);
        break;
      }

      // If not, we check the valid neighbours
      this.exploreNeighbours(curNode!);
    }

    return this;
  }

  exploreNeighbours(curNode: Coords) {
    /** Possible directions
     * not all directions will be valid for every node
     * we need to update the curNodes x,y and then see if its out of bound or its a obstacle node
     */
    const direction = [
      // TOP
      {
        x: 0,
        y: -1,
      },
      // BOTTOM
      {
        x: 0,
        y: 1,
      },
      // RIGHT
      {
        x: 1,
        y: 0,
      },
      // LEFT
      {
        x: -1,
        y: 0,
      },
    ];

    for (let i = 0; i < direction.length; i++) {
      const newX = curNode!.x + direction[i].x;
      const newY = curNode!.y + direction[i].y;

      if (!this.isWalkable({ x: newX, y: newY })) continue;

      //   console.log("Adding:", `(${newY},${newX})`);

      this.queue.push({ x: newX, y: newY });
      this.visited[`(${newY},${newX})`] = true;
      this.parents[`(${newY},${newX})`] = curNode!;
    }
  }

  isWalkable({ x: newX, y: newY }: Coords): boolean {
    if (newX < 0 || newX > this.dimension - 1) return false;
    if (newY < 0 || newY > this.dimension - 1) return false;
    if (this.visited[`(${newY},${newX})`]) return false;
    if (this.obstacles.get(`(${newY},${newX})`) instanceof Wall) return false;
    return true;
  }

  reconstruct(target: Coords): Coords[] {
    const path: Coords[] = [];
    let current: Coords | null = target;
    let currentKey = `(${current.y},${current.x})`;

    while (current !== null) {
      path.unshift(current);
      current = this.parents[currentKey] ?? null;
      if (current) {
        currentKey = `(${current.y},${current.x})`;
      }
    }

    return path;
  }

  reset() {
    this.queue = [];
    this.visited = {};
    this.parents = {};
    this.path = [];
  }
}
