import { JSXElement } from "solid-js";
import { ShapeInfo } from "kld-intersections";

export type ShapeStyle = Record<string, any>;
export type LabelStyle = Record<string, any>;
export type EdgeStyle = Record<string, any>;
export type MarkerStyle = Record<string, any>;

export interface Shape {
  render(width: number, height: number, style: ShapeStyle) : JSXElement;
  shapeInfo(width: number, height: number) : ShapeInfo;
};

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

export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};
