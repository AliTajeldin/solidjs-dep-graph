import { Node } from "solidjs-dep-graph";
import { Edge } from "solidjs-dep-graph";
import { Graph } from "solidjs-dep-graph";

export default function Basic() {
  const nodes: Node[] = [
    new Node("1", "Node 1", {shape: "circle"}),
    new Node("2", "2", {shape: "diamond"}),
    new Node("3", "Node 3", {shape: "diamond"}),
    new Node("4", "N4", {shapeStyle: { fill:"red"}, labelStyle: { stroke:"yellow"}}),
    new Node("5", "Node 5"),
    new Node("6", "Node 6"),
  ];
  const edges: Edge[] = [
    new Edge("1", "2", ),
    new Edge("2", "3", ),
    new Edge("2", "4", {endMarkerType: "none"}),
    new Edge("1", "5", {endMarkerType: "circle"}),
    new Edge("1", "6", {edgeStyle: {stroke:"red"}, markerStyle: { stroke: "yellow", fill: "green"}}),
  ];

  const graph = new Graph(nodes, edges);
  graph.layout()
  // graph.dump();
  
  return (
    <svg class="thedude" width={graph.getWidth()} height={graph.getHeight()}
        style="margin-top: 20px; margin-left: 20px; border: 2px solid green"
      preserveAspectRatio="none" >
        {graph.render()}
    </svg>
  );
}
