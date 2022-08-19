import { graphlib, layout } from "dagre";
import { createEffect, createSignal, For, on, onMount } from "solid-js";
import { Node } from "../models/node";
import { Edge } from "../models/edge";

export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};

// add width, height as they are added during layout by Dagre
interface InternalLayoutOptions extends LayoutOptions {
  width?: number,
  height?: number,
};

// TODO: make this part of the Graph instance (so multiple graphs can have own scale)
const [ scale, setScale ] = createSignal(1);

// TODO: add resize handler window.onResize and get innnerHeight/Width of enclosing window!
export class Graph {
  nodes: Node[];
  edges: Edge[];
  layoutOptions: InternalLayoutOptions;

  constructor(nodes: Node[] = [], edges: Edge[] = []) {
    this.nodes = nodes;
    this.edges = edges;

    // TODO: accept as an option override
    this.layoutOptions = {
      marginx: 15,
      marginy: 15,
      rankdir: 'LR',
      ranksep: 55,
      nodesep: 35,
    };
  }

  getWidth() { return this.layoutOptions.width }
  getHeight() { return this.layoutOptions.height }

  layout() {
    const graph = new graphlib.Graph();
    graph.setGraph(this.layoutOptions);
    graph.setDefaultEdgeLabel(() => { return {} });

    this.nodes.forEach((n) => graph.setNode(n.id, n));
    this.edges.forEach((e) => graph.setEdge(e.from, e.to, e));

    layout(graph);
  }

  render() {
    let svgRef;
    onMount(() => {
      svgRef.addEventListener("wheel", ({deltaY}) => {
        const normDeltaY =  deltaY > 0 ?
          1 - Math.min(deltaY, 200) / 400 :
          (1 + -deltaY / 300);
        const newScale = Math.min(10, Math.max(0.25, normDeltaY * scale()))
        setScale(newScale);
      });
    });

    return (
      <svg ref={svgRef} pointer-events="visible">
        {/* bg rect to accept pointer events (propagates to parent svg) */}
        <rect class="pointer-target fill-transparent" width="100%" height="100%"/>
        <g pointer-events="none" transform={`matrix(${scale()} 0 0 ${scale()} 0 0)`}>
          <For each={this.nodes}>
            {(n) => n.render()}
          </For>
          <For each={this.edges}>
            {(e) => e.render()}
          </For>
        </g>
      </svg>
    );
  }

  dump() {
    console.log("Layout =", this.layoutOptions);
    this.nodes.forEach(n => console.log(`Node(${n.id}) = `, n));
    this.edges.forEach(e => console.log(`Edge(${e.label}) = `, e));
  }
}