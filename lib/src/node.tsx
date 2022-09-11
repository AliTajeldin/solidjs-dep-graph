import { JSX, JSXElement } from "solid-js";
import { defaultsDeep } from 'lodash-es';
import { Factory } from "./factory";
import { Point, StylePropsT } from "./types";
import { Shapes, Intersection } from "kld-intersections";
import { labelStyle } from "./styles";

export interface NodeOptions {
  shape?: string;
  width?: number;
  height?: number;
  imageUrl?: string;
  dblClickCB?: (n: Node, e: MouseEvent) => void;
  shapeStyle?: StylePropsT;
  labelStyle?: StylePropsT;
};

const defaultNodeOptions: NodeOptions = {
  shape: "rect",
  width: undefined,
  height: undefined,
  dblClickCB: undefined,
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
    this.width = nodeOptions.width || (22 + 6.0 * this.label.length);
    this.height = nodeOptions.height || 30;

    this.nodeOptions = defaultsDeep({}, nodeOptions, defaultNodeOptions);
  }

  renderShape() {
    const shape = Factory.getShape(this.nodeOptions.shape);
    return shape.render(this.width, this.height, this.nodeOptions.shapeStyle, this.nodeOptions);
  }

  renderLabel() {
    return (
      <text dominant-baseline="middle" text-anchor="middle" style={{
        ...labelStyle,
        ...(this.nodeOptions.labelStyle as any)
      }}>
        {this.label}
      </text>
    );
  }

  private _handleDblClick: JSX.EventHandler<SVGElement, MouseEvent> = (evt) => {
    this.nodeOptions.dblClickCB?.call(this, this, evt);
  }

  // determine where given point intersects (enters) this node.
  // point and return point are both in graph coordinates.
  // while shapeInfo and intersects are using shape coordinates (origin 0,0)
  intersect(point: Point): Point {
    const shape = Factory.getShape(this.nodeOptions.shape);
    const nodeShape = shape.shapeInfo(this.width, this.height);
    const lineShape = Shapes.line(point.x - this.x, point.y - this.y, 0, 0);

    const inter = Intersection.intersect(lineShape, nodeShape);

    if (inter.points.length > 0) {
      return new Point(inter.points[0].x + this.x, inter.points[0].y + this.y);
    }
    return new Point(this.x, this.y);
  }

  render(): JSXElement {
    return <g onDblClick={this._handleDblClick} pointer-events="all"
      class="fill-transparent hover:fill-secondary-bg stroke-white"
      transform={`translate(${this.x} ${this.y})`}
    >
      {this.renderShape()}
      {this.renderLabel()}
    </g>
  }
}
