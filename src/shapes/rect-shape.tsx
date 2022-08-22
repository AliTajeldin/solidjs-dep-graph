import { Shape, ShapeStyle } from "../types";

export class RectShape implements Shape {
  doRender(width: number, height: number, style: ShapeStyle) {
    const xoff = -width / 2;
    const yoff = -height / 2;

    return (
      <rect x={xoff} y={yoff} width={width} height={height} rx="5"
        class="fill-graph-1 stroke-primary" style={style} />
    );

  }
}
