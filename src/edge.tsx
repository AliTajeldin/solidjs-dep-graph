import { JSXElement } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { EdgeStyle } from "./types";

export interface EdgeOptions {
  edgeStyle?: EdgeStyle;
  markerStyle?: EdgeStyle;
};

const defaultEdgeOptions: EdgeOptions = {
  edgeStyle: {},
  markerStyle: {},
}

export class Edge {
  readonly id: number
  readonly from: string;
  readonly to: string;
  readonly edgeOptions: EdgeOptions;
  points?: { x: number, y: number }[];

  static seq : number = 0;

  constructor(from: string, to: string, options: EdgeOptions = {}) {
    this.id = Edge.seq++;
    this.from = from;
    this.to = to;
    this.edgeOptions = defaultsDeep({}, options, defaultEdgeOptions);
  }

  markerId() {
    return `sdg-marker-${this.id}`;
  }

  Markers() {
    return <defs>
      <marker
        id={this.markerId()}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="8"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path class="stroke-pink-200 fill-pink-200"
          d="M 0 0 L 10 5 L 0 10 z"
          style={this.edgeOptions.markerStyle}
        ></path>
      </marker>

    </defs>
  }

  render(): JSXElement {
    const move = `M ${this.points[0].x},${this.points[0].y}`;
    const lines = this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g class="fill-transparent stroke-pink-200" style={this.edgeOptions.edgeStyle}>
      <path d={`${move} ${lines}`} marker-end={`url(#${this.markerId()}`} />
      {this.Markers()}
    </g>
  }

}
