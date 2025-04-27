export type Coords = { x: number; y: number };

export interface IEntity {
  x: number;
  y: number;
  char: string;
  health?: number;
}

export interface IScene {
  mapWidth: number;
  mapHeight: number;
  playerStartingX: number;
  playerStartingY: number;
  label: string;
}
