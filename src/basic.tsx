import { Node } from "./node";
import { Edge } from "./edge";
import { Graph } from "./graph";

export default function Basic() {
  const nodes: Node[] = [
    new Node("1", "Node 1 zzz"),
    new Node("2", "2", {shape: "circle"}),
    new Node("3", "Node 3", {shape: "diamond"}),
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
    <svg class="mt-5 ml-5 border-2 border-primary" width={graph.getWidth()} height={graph.getHeight()}
      preserveAspectRatio="none" >
        {graph.render()}
    </svg>
  );
}
