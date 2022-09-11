import { JSXElement } from "solid-js";
import { ShapeInfo } from "kld-intersections";
import { StylePropsT } from "../types";

export interface Shape {
  render(width: number, height: number, style: StylePropsT, shapeOptions: any) : JSXElement;
  shapeInfo(width: number, height: number) : ShapeInfo;
};
