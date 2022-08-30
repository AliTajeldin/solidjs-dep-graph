import { Shape, ShapeStyle } from "../types";
import { ShapeInfo, Shapes } from "kld-intersections";
import colors from '../styles/colors';

export class RectShape implements Shape {
  render(width: number, height: number, style: ShapeStyle) {
    const xoff = -width / 2;
    const yoff = -height / 2;

    return (
      <rect x={xoff} y={yoff} width={width} height={height} rx="5"
        style={{
          fill: colors.nodeBG,
          stroke: colors.nodeBorder,
          ...style
        }} />
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.rectangle(-width / 2, -height / 2, width, height, 5, 5);
  }
}
