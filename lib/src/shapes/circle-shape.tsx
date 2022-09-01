import { ShapeInfo, Shapes } from "kld-intersections";
import { Shape } from "./shape-types";
import { StylePropsT } from "../types";
import { shapeStyle } from '../styles';

export class CircleShape implements Shape {
  private radius(width: number, height: number) {
    return Math.max(width, height)/2;
  }

  render(width: number, height: number, style: StylePropsT) {
    const r = this.radius(width, height);

    return (
      <circle cx={0} cy={0} r={r} style={{
        ...shapeStyle,
        ...style
      }}/>
    );
  }

  shapeInfo(width: number, height: number) : ShapeInfo {
    return Shapes.circle(0, 0, this.radius(width, height));
  }
}
