import { Node } from "~/models/node";
import { Edge } from "~/models/edge";
import { Graph } from "~/models/graph";

export default function Basic() {
  const nodes: Node[] = [
    new Node("1", "Node "),
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

  const graph = new Graph(nodes, edges);
  graph.layout()
  graph.dump();
  
  return (
    <main>
      <svg class="ml-5 border-2 border-primary" width={graph.getWidth()} height={graph.getHeight()}
        preserveAspectRatio="none" >
          {graph.render()}
      </svg>
    </main>
  );
}
