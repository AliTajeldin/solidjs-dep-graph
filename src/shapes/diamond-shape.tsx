import { Shape, ShapeStyle } from "../types";
import { ShapeInfo, Shapes } from "kld-intersections";


export class DiamondShape implements Shape {
  private pathString(width: number, height: number) {
    const xoff = 5 + width / 2;
    const yoff = 5 + height / 2;

    return `M -${xoff} 0 L 0 -${yoff} L ${xoff} 0 L 0 ${yoff} z`;
  }

  render(width: number, height: number, style: ShapeStyle) {
    return (
      <path class="fill-graph-1 stroke-primary" style={style}
        d={this.pathString(width, height)} />
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.path(this.pathString(width, height));
  }
}