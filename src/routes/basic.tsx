import { Node } from "~/models/node";
import { Edge } from "~/models/edge";
import { Graph } from "~/models/graph";

export default function Basic() {
  const nodes: Node[] = [
    new Node("1", "Node 1 Long Name"),
    new Node("2", "2"),
    new Node("3", "Node 3"),
    new Node("4", "N4", {shapeStyle: { fill:"red"}, labelStyle: { stroke:"yellow"}}),
    new Node("5", "Node 5"),
    new Node("6", "Node 6"),
  ];
  const edges: Edge[] = [
    new Edge("1", "2", ),
    new Edge("2", "3", ),
    new Edge("2", "4", ),
    new Edge("1", "5", ),
    new Edge("1", "6", {edgeStyle: {stroke:"yellow"}}),
  ];

  const graph = new Graph(nodes, edges);
  graph.layout()
  // graph.dump();
  
  return (
    <main>
      <svg class="ml-5 border-2 border-primary" width={graph.getWidth()} height={graph.getHeight()}
        preserveAspectRatio="none" >
          {graph.render()}
      </svg>
    </main>
  );
}