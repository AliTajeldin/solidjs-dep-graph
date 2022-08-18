import { JSXElement } from "solid-js";

export class Node {
  readonly id : string;
  readonly label : string;
  meta : any;
  x : number;
  y : number;
  width : number;
  height : number;

  constructor(id:string, label:string, meta:any = {}) {
    this.id = id;
    this.label = label;
    this.meta = meta;
    this.x = 0;
    this.y = 0;
    this.width = 60;
    this.height = 25;
  }

  // TODO: add a get width() getter that calls computeWidth() that would lazy eval
  // the computed width based on input params
  // TODO: add padding around text (affects the width/height)

  render() : JSXElement {
    const xoff = -this.width / 2;
    const yoff = -this.height / 2;

    return <g class="fill-transparent stroke-blue-600" transform={`translate(${this.x} ${this.y})`}>
      <rect x={xoff} y={yoff} width={this.width} height={this.height}/> 
      <text dominant-baseline="middle" text-anchor="middle">{this.label}</text>
     </g>
  }
}
