import { Shape, ShapeStyle } from "../types";

export class DiamondShape implements Shape {
  render(width: number, height: number, style: ShapeStyle) {
    const xoff = 5 + width / 2;
    const yoff = 5 + height / 2;

    return (
      <path class="fill-graph-1 stroke-primary" style={style}
        d={`M -${xoff} 0 L 0 -${yoff} L ${xoff} 0 L 0 ${yoff} z`}/>
    );

  }
}
