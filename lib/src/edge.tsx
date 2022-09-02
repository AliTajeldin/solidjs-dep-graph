import { JSXElement, Show } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { StylePropsT  } from "./types";
import { Factory } from "./factory";
import { edgeStyle } from "./styles";

export interface EdgeOptions {
  endMarkerType?: string,
  edgeStyle?: StylePropsT,
  markerStyle?: StylePropsT,
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

  static seq: number = 0;

  constructor(from: string, to: string, options: EdgeOptions = {}) {
    this.id = Edge.seq++;
    this.from = from;
    this.to = to;
    this.edgeOptions = defaultsDeep({}, options, defaultEdgeOptions);
  }

  render(): JSXElement {
    const Marker = Factory.getMarker(this.edgeOptions.endMarkerType);
    const markerId = `sdg-marker-${this.id}`;
    const move = `M ${this.points[0].x},${this.points[0].y}`;
    const lines = this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g style={{
      ...edgeStyle,
      ...this.edgeOptions.edgeStyle,
    }}>
      <path d={`${move} ${lines}`} marker-end={`url(#${markerId}`} />
      <Show when={Marker !== null}>
        <defs>
          <Marker id={markerId} markerStyle={this.edgeOptions.markerStyle} />
        </defs>
      </Show>
    </g>
  }
}
