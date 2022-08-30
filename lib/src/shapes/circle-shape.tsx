import { Shape, ShapeStyle } from "../types";
import { ShapeInfo, Shapes } from "kld-intersections";
import c from './shape-style.module.css';

export class CircleShape implements Shape {
  private radius(width: number, height: number) {
    return Math.max(width, height)/2;
  }

  render(width: number, height: number, style: ShapeStyle) {
    const r = this.radius(width, height);

    return (
      <circle cx={0} cy={0} r={r}
      class={c.graph_node_1} style={style} />
    );
  }

  shapeInfo(width: number, height: number) : ShapeInfo {
    return Shapes.circle(0, 0, this.radius(width, height));
  }
}
