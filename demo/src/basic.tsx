import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from './style.module.css';

export default function Basic() {
  const nodes: Node[] = [
    //   new Node("1", "Node 1", { shape: "circle" }),
    //   new Node("2", "2", { shape: "diamond" }),
    //   new Node("3", "Node 3", { shape: "diamond" }),
    //   new Node("4", "N4",
    //   // { shapeStyle: { fill: "red" }, labelStyle: { stroke: "yellow" } }
    //   ),
    //   new Node("5", "Node 5"),
    //   new Node("6", "Node 6"),
    // ];
    // const edges: Edge[] = [
    //   new Edge("1", "2",),
    //   new Edge("2", "3",),
    //   new Edge("2", "4", { endMarkerType: "none" }),
    //   new Edge("1", "5", { endMarkerType: "circle" }),
    //   new Edge("1", "6", 
    //   // { edgeStyle: { stroke: "red" }, markerStyle: { stroke: "yellow", fill: "green" } }
    //   ),
    // ];
    new Node("1", "Node 1"),
    new Node("2", "Node 2"),
    new Node("3", "Node 3"),
    new Node("4", "Node 4"),
    new Node("5", "Node 5"),
    new Node("6", "Node 6"),
  ];
  const edges: Edge[] = [
    new Edge("1", "2",),
    new Edge("2", "3",),
    new Edge("2", "4"),
    new Edge("1", "5"),
    new Edge("1", "6",),
  ];

  const graph = new Graph(nodes, edges);

  // TODO: this should move into graph.render on first call!
  //       but, how do we get width/height to set svg .
  //       OOOR, do this in Graph ctor.
  graph.layout()
  // graph.dump();

  return (
    <svg class={c.svgBasic} width={graph.getWidth()} height={graph.getHeight()}
      preserveAspectRatio="none" >
      {graph.render()}
    </svg>
  );
}
