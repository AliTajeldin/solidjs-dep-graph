import { RectShape } from "./rect-shape";
import { CircleShape } from "./circle-shape";
import { DiamondShape } from "./diamond-shape";
import { ImageShape } from "./image-shape";
export type { Shape } from "./shape-types";

export const BUILTIN_SHAPES = {
  "rect": new RectShape(),
  "circle": new CircleShape(),
  "diamond": new DiamondShape(),
  "image": new ImageShape(),
};
