import { graphlib, layout } from "dagre";
import { createEffect, createSignal, For, onMount } from "solid-js";
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

// TODO: remove this.  for testing only
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
    // createEffect(() => setTimeout(() => setScale(1.0), 2000));
    return (
      <g transform={`matrix(${scale()} 0 0 ${scale()} 0 0)`}>
        <For each={this.nodes}>
          {(n) => n.render()}
        </For>
        <For each={this.edges}>
          {(e) => e.render()}
        </For>
      </g>
    );
  }

  dump() {
    console.log("Layout =", this.layoutOptions);
    this.nodes.forEach(n => console.log(`Node(${n.id}) = `, n));
    this.edges.forEach(e => console.log(`Edge(${e.label}) = `, e));
  }
}