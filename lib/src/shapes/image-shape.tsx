import { ShapeInfo, Shapes } from "kld-intersections";
import { Shape } from "./shape-types";
import { StylePropsT } from "../types";
import { shapeStyle } from '../styles';

export class ImageShape implements Shape {
  render(width: number, height: number, style: StylePropsT, shapeOptions: any) {
    const xoff = -width / 2;
    const yoff = -height / 2;
    const href = shapeOptions.imageUrl;

    if (!href) {
      throw new Error("image node requires imageUrl option");
    }

    return (
      <image x={xoff} y={yoff} width={width} height={height}
        href={href}
        style={{
          ...shapeStyle,
          ...style
        }} />
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.rectangle(-width / 2, -height / 2, width, height, 5, 5);
  }
}
