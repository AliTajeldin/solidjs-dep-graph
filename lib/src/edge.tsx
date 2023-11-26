import { JSXElement, Show } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { StylePropsT } from "./types";
import { Factory } from "./factory";
import { edgeStyle } from "./styles";

export interface EdgeOptions {
  markerStart?: string,
  markerEnd?: string,
  edgeStyle?: StylePropsT,
  markerStyle?: StylePropsT,
};

const defaultEdgeOptions: EdgeOptions = {
  markerStart: "none",
  markerEnd: "arrow",
  edgeStyle: {},
  markerStyle: {},
}

export class EdgeC {
  readonly id: number
  readonly from: string;
  readonly to: string;
  readonly edgeOptions: EdgeOptions;
  points?: { x: number, y: number }[];

  static seq: number = 0;

  constructor(from: string, to: string, options: EdgeOptions = {}) {
    this.id = EdgeC.seq++;
    this.from = from;
    this.to = to;
    this.edgeOptions = defaultsDeep({}, options, defaultEdgeOptions);
  }

  render(): JSXElement {
    const MarkerStart = Factory.getMarker(this.edgeOptions.markerStart);
    const MarkerEnd = Factory.getMarker(this.edgeOptions.markerEnd);
    const markerStartId = `sdg-marker-start-${this.id}`;
    const markerEndId = `sdg-marker-end-${this.id}`;

    const move = `M ${this.points[0].x},${this.points[0].y}`;
    const lines = this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g style={{
      ...edgeStyle,
      ...this.edgeOptions.edgeStyle,
    }}>
      <path d={`${move} ${lines}`} marker-start={`url(#${markerStartId}`} marker-end={`url(#${markerEndId}`} />
      <Show when={MarkerStart !== null}>
        <defs>
          <MarkerStart id={markerStartId} markerStyle={this.edgeOptions.markerStyle} />
        </defs>
      </Show>
      <Show when={MarkerEnd !== null}>
        <defs>
          <MarkerEnd id={markerEndId} markerStyle={this.edgeOptions.markerStyle} />
        </defs>
      </Show>
    </g>
  }
}

export const Edge = (from: string, to: string, options: EdgeOptions = {}) => {
  return new EdgeC(from, to, options);
}
