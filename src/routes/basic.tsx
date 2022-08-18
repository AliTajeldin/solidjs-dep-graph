import { graphlib, layout } from "dagre";
import { createEffect, For, onMount } from "solid-js";
import { Node } from "../models/node";
import { Edge } from "../models/edge";

export default function Basic() {
  const g = new graphlib.Graph();
  // TODO: make this user options!
  g.setGraph({
    marginx: 15,
    marginy: 15,
    rankdir: 'LR',
    ranksep: 55,
    nodesep: 35,
  });
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  const nodes: Node[] = [
    new Node("1", "Node 1a"),
    new Node("2", "Node 2b"),
    new Node("3", "Node 3"),
    new Node("4", "Node 4"),
    new Node("5", "Node 5"),
  ];
  const edges: Edge[] = [
    new Edge("1", "2", "E1"),
    new Edge("2", "3", "E2"),
    new Edge("2", "4", "E3"),
    new Edge("1", "5", "E4"),
  ];
  nodes.forEach((n) => g.setNode(n.id, n));
  edges.forEach((e) => g.setEdge(e.from, e.to, e));

  layout(g);
  console.log('AFTER layout!!');
  nodes.forEach(n => console.log(`Node(${n.id}) = `, n));
  edges.forEach(e => console.log(`Edge(${e.label}) = `, e));

  const renderNodes = () => nodes.map(n => n.render());
  const renderEdges = () => edges.map(e => e.render());

  // <main class="text-center mx-auto w-11/12 text-yellow-500 bg-green-800 ">
  // <svg class="bg-orange-300" height={400} width="100%"

  return (
    <main>
      <svg class="bg-orange-300" width="100%"
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
