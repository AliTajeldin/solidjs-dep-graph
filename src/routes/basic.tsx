import { graphlib, layout } from "dagre";
import { createEffect, For, onMount } from "solid-js";
import { Node } from "../models/node";
import { Edge } from "../models/edge";

export default function Basic() {
  // TODO: make this user options!
  const layoutOptions = {
    marginx: 15,
    marginy: 15,
    rankdir: 'LR',
    ranksep: 55,
    nodesep: 35,
    height: undefined as number,
    width: undefined as number,
  };
  
  const g = new graphlib.Graph();
  g.setGraph(layoutOptions);
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  const nodes: Node[] = [
    new Node("1", "Node 1a long name blah blah blah"),
    new Node("2", "2"),
    new Node("3", "Node 3"),
    new Node("4", "N4"),
    new Node("5", "Node 5"),
    new Node("6", "Node 6"),
  ];
  const edges: Edge[] = [
    new Edge("1", "2", "E1"),
    new Edge("2", "3", "E2"),
    new Edge("2", "4", "E3"),
    new Edge("1", "5", "E4"),
    new Edge("1", "6", "E5"),
  ];
  nodes.forEach((n) => g.setNode(n.id, n));
  edges.forEach((e) => g.setEdge(e.from, e.to, e));

  layout(g);
  console.log('AFTER layout!!');
  console.log("g =", g);
  console.log("layout opts =", layoutOptions);
  
  
  nodes.forEach(n => console.log(`Node(${n.id}) = `, n));
  edges.forEach(e => console.log(`Edge(${e.label}) = `, e));

  return (
    <main>
      <svg class="border-2 border-primary" width={layoutOptions.width} height={layoutOptions.height}
        preserveAspectRatio="none" >
        <For each={nodes}>
          {(n) => n.render()}
        </For>
        <For each={edges}>
          {(e) => e.render()}
        </For>
      </svg>
    </main>
  );
}
