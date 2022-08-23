import { Shape, ShapeStyle } from "../types";

export class CircleShape implements Shape {
  render(width: number, height: number, style: ShapeStyle) {
    const r = Math.max(width, height)/2;

    return (
      <circle cx={0} cy={0} r={r}
        class="fill-graph-1 stroke-primary" style={style} />
    );
  }
}
