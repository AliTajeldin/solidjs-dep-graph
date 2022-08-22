import { createSignal, JSX, JSXElement, onMount } from "solid-js";
import { defaultsDeep } from 'lodash-es';

export interface NodeOptions {
  shapeStyle?: Record<string, any>;
  labelStyle?: Record<string, any>;
};

const defaultNodeOptions : NodeOptions = {
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
    const xoff = -this.width / 2;
    const yoff = -this.height / 2;

    return (
      <rect x={xoff} y={yoff} width={this.width} height={this.height} rx="5"
        class="fill-graph-1 stroke-primary" style={this.nodeOptions.shapeStyle} />
    );
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
