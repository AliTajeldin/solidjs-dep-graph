import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from '../style.module.css';

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

  return (
    <div class={c.demoArea} style="margin: 25px">
      <Graph nodes={nodes} edges={edges}/>
      <div class={c.demoDescription}>
        An example of simplest graph.<br/>Only two properties are required to be specified:
        <ul>
          <li>nodes: array of Node objects</li>
          <li>edges: array of Edge objects</li>
        </ul>
      </div>
    </div>
  );
}
