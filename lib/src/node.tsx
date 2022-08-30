import { JSX, JSXElement } from "solid-js";
import { defaultsDeep } from 'lodash-es';
import { Factory } from "./factory";
import { LabelStyle, Point, ShapeStyle } from "./types";
import { Shapes, Intersection } from "kld-intersections";

export interface NodeOptions {
  shape?: string;
  shapeStyle?: ShapeStyle;
  labelStyle?: LabelStyle;
};

const defaultNodeOptions: NodeOptions = {
  shape: "rect",
  shapeStyle: {},
  labelStyle: {},
}

export class Node {
  readonly id: string;
  readonly label: string;

  x: number;
  y: number;
  width: number;
  height: number;

  nodeOptions: NodeOptions;

  constructor(id: string, label: string, nodeOptions: NodeOptions = {}) {
    this.id = id;
    this.label = label;

    this.x = 0;
    this.y = 0;
    [this.width, this.height] = this.computeSize();

    this.nodeOptions = defaultsDeep({}, nodeOptions, defaultNodeOptions);
  }

  computeSize() {
    return [20 + 5.5 * this.label.length, 25]
  }

  renderShape() {
    const shape = Factory.instance.getShape(this.nodeOptions.shape);
    return shape.render(this.width, this.height, this.nodeOptions.shapeStyle);
  }

  renderLabel() {
    return (
      <text dominant-baseline="middle" text-anchor="middle"
        class="stroke-secondary text-xs font-thin select-none"
        style={this.nodeOptions.labelStyle}
      > {this.label} </text>
    );
  }

  private handleDblClick: JSX.EventHandler<SVGElement, MouseEvent> = (evt) => {
    console.log("node double click", evt);
  }

  // determine where given point intersects (enters) this node.
  // point and return point are both in graph coordinates.
  // while shapeInfo and intersects are using shape coordinates (origin 0,0)
  intersect(point: Point): Point {
    const shape = Factory.instance.getShape(this.nodeOptions.shape);
    const nodeShape = shape.shapeInfo(this.width, this.height);
    const lineShape = Shapes.line(point.x - this.x, point.y - this.y, 0, 0);

    const inter = Intersection.intersect(lineShape, nodeShape);

    if (inter.points.length > 0) {
      return new Point(inter.points[0].x + this.x, inter.points[0].y + this.y);
    }
    return new Point(this.x, this.y);
  }

  render(): JSXElement {
    return <g onDblClick={this.handleDblClick} pointer-events="all"
      class="fill-transparent hover:fill-secondary-bg stroke-white"
      transform={`translate(${this.x} ${this.y})`}
    >
      {this.renderShape()}
      {this.renderLabel()}
    </g>
  }
}
