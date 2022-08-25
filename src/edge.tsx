import { JSXElement } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { EdgeStyle, MarkerStyle } from "./types";
import { ArrowMarker } from "./markers/arrow-marker";
import { CircleMarker } from "./markers/circle-marker";

export interface EdgeOptions {
  edgeStyle?: EdgeStyle;
  markerStyle?: MarkerStyle;
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

  render(): JSXElement {
    const markerId = `sdg-marker-${this.id}`;
    const move = `M ${this.points[0].x},${this.points[0].y}`;
    const lines = this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g class="fill-transparent stroke-graph-edge" style={this.edgeOptions.edgeStyle}>
      <path d={`${move} ${lines}`} marker-end={`url(#${markerId}`} />
      <defs>
        <CircleMarker id={markerId} markerStyle={{}}/>
      </defs>
    </g>
  }

}
