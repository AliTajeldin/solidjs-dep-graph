
export type StylePropsT = Record<string, any>;

export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
};

export class Size {
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }
}

// TODO: move this closer to where it is defined!
export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};
