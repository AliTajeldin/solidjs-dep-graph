import { JSX, JSXElement } from "solid-js";
import { defaultsDeep } from 'lodash-es';
import { Factory  } from "./factory";
import { LabelStyle, ShapeStyle } from "./types";

export interface NodeOptions {
  shape?: string;
  shapeStyle?: ShapeStyle;
  labelStyle?: LabelStyle;
};

const defaultNodeOptions : NodeOptions = {
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

  constructor(id: string, label: string, nodeOptions: NodeOptions = {} ) {
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
    const shape = Factory.instance.getShape("rect");
    return shape.doRender(this.width, this.height, this.nodeOptions.shapeStyle);
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
