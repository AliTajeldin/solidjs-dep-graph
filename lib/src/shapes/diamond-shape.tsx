import { Shape, ShapeStyle } from "../types";
import { ShapeInfo, Shapes } from "kld-intersections";
import { shapeStyle } from '../styles';

export class DiamondShape implements Shape {
  private pathString(width: number, height: number) {
    const xoff = 10 + width / 2;
    const yoff = 10 + height / 2;

    return `M -${xoff} 0 L 0 -${yoff} L ${xoff} 0 L 0 ${yoff} z`;
  }

  render(width: number, height: number, style: ShapeStyle) {
    return (
      <path d={this.pathString(width, height)} style={{
        ...shapeStyle,
        ...style
      }}/>
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.path(this.pathString(width, height));
  }
}
