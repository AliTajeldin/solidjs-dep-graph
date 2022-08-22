import { JSXElement } from "solid-js";

export type ShapeStyle = Record<string, any>;
export type LabelStyle = Record<string, any>;
export type EdgeStyle = Record<string, any>;

export interface Shape {
  doRender(width: number, height: number, style: ShapeStyle) : JSXElement;
};
