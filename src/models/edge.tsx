
import { JSXElement } from "solid-js";

export class Edge {
  readonly from : string;
  readonly to : string;
  readonly label : string;
  points? : {x:number, y:number}[];

  constructor(from: string, to: string, label: string = "") {
    this.from = from
    this.to = to
    this.label = label;
  }

  render() : JSXElement {
    const move=`M ${this.points[0].x},${this.points[0].y}`;
    const lines=this.points.slice(1).
      map((p) => `L ${p.x},${p.y}`).join(' ');
    return <g class="fill-transparent stroke-pink-200">
      <path d={`${move} ${lines}`}/>
     </g>
  }

}
