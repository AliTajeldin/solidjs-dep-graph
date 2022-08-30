import { RectShape } from "./rect-shape";
import { CircleShape } from "./circle-shape";
import { DiamondShape } from "./diamond-shape";

export const BUILTIN_SHAPES = {
  "rect" : new RectShape(),
  "circle" : new CircleShape(),
  "diamond" : new DiamondShape(),
};
