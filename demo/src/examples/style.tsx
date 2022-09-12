import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from '../style.module.css';

export default function StyleExample() {
  const nodes: Node[] = [
    new Node("1", "Node 1", {
      shape: "circle",
      labelStyle: { stroke: "black" }
    }),
    new Node("2", "Node 2", { shape: "diamond" }),
    new Node("3", "Node 3", { shape: "rect" }),
    new Node("4", "Node 4", {
      shapeStyle: { fill: "red" },
      labelStyle: { stroke: "yellow" }
    }),
  ];
  const edges: Edge[] = [
    new Edge("1", "2", { markerEnd: "circle" }),
    new Edge("2", "3", {
      edgeStyle: { stroke: "red" },
      markerStyle: { stroke: "yellow", fill: "green" }
    }),
    new Edge("2", "4", { markerEnd: "none" }),
  ];

  return (
    <div class={c.demoArea} style="margin: 25px">
      <Graph nodes={nodes} edges={edges} />
      <div class={c.demoDescription}>
        Shape, label, and marker sytling can be overriden by user by specifying<br/>
        `shapeStyle`, `labelStyle`, and `markerStyle` properties respectively.
      </div>
    </div>
  );
}
