import { JSXElement, Show } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { EdgeStyle, MarkerStyle } from "./types";
import { Factory } from "./factory";

export interface EdgeOptions {
  endMarkerType?: string,
  edgeStyle?: EdgeStyle,
  markerStyle?: MarkerStyle,
};

const defaultEdgeOptions: EdgeOptions = {
  endMarkerType: "arrow",
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
    const Marker = Factory.instance.getMarker(this.edgeOptions.endMarkerType);
    const markerId = `sdg-marker-${this.id}`;
    const move = `M ${this.points[0].x},${this.points[0].y}`;
    const lines = this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g class="fill-transparent stroke-graph-edge" style={this.edgeOptions.edgeStyle}>
      <path d={`${move} ${lines}`} marker-end={`url(#${markerId}`} />
      <Show when={Marker !== null}>
        <defs>
          <Marker id={markerId} markerStyle={{}}/>
        </defs>
      </Show>
    </g>
  }
}
