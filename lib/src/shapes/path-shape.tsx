import { ShapeInfo, Shapes } from "kld-intersections";
import { Shape } from "./shape-types";
import { StylePropsT } from "../types";
import { shapeStyle } from '../styles';

/**
 * Base shape for SVG path based shapes.
 * Users only need to override the `path` method to provide the SVG path string.
 */
export class PathShape implements Shape {
   path(width: number, height: number) : string{
    throw new Error("must implement path() method!")
  }

  render(width: number, height: number, style: StylePropsT) {
    return (
      <path d={this.path(width, height)} style={{
        ...shapeStyle,
        ...style
      }}/>
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.path(this.path(width, height));
  }
}
