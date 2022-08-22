import { JSXElement } from "solid-js";
import { defaultsDeep } from "lodash-es";
import { EdgeStyle } from "./types";

export interface EdgeOptions {
  edgeStyle?: EdgeStyle;
};

const defaultEdgeOptions : EdgeOptions = {
  edgeStyle: {},
}

// TODO: define Point and Size types.
export class Edge {
  readonly from : string;
  readonly to : string;
  readonly edgeOptions : EdgeOptions;
  points? : {x:number, y:number}[];

  constructor(from: string, to: string, options: EdgeOptions = {}) {
    this.from = from
    this.to = to
    this.edgeOptions = defaultsDeep({}, options, defaultEdgeOptions);
  }

  render() : JSXElement {
    const move=`M ${this.points[0].x},${this.points[0].y}`;
    const lines=this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g class="fill-transparent stroke-pink-200" style={this.edgeOptions.edgeStyle}>
      <path d={`${move} ${lines}`}/>
     </g>
  }

}
