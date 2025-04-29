// Util Types
export type Coords = { x: number; y: number };
export enum Rotation {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

// Main Interfaces
export interface IEntity {
  x: number;
  y: number;
  char: string;
  health?: number;
}

/**
 * Represents a Scene interface
 * @property {number} mapWidth - The scene's width, used for player movement boundary
 * @property {number} mapHeight - The scene's height, used for player movement boundary
 * @property {number} [playerStartingX] - Can be used as starting spawn points in future
 * @property {number} [playerStartingY] - Can be used as starting spawn points in future
 * @property {string} label - Used to generate
 */
export interface IScene {
  mapWidth: number;
  mapHeight: number;
  playerStartingX?: number;
  playerStartingY?: number;
  label: string;
}

export interface IDoor extends Omit<IEntity, "char"> {
  destination: Symbol;
  destinationCoords: Coords;
  rotation: Rotation;
}
