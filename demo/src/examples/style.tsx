import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from '../style.module.css';
import { Description } from "../description";

export default function StyleExample() {
  const description = <>
    Shape, label, and marker sytling can be overriden by user by specifying<br />
    `shapeStyle`, `labelStyle`, and `markerStyle` properties respectively.<br />
    <br />
  </>

  //--BEGIN
  const nodes = [
    Node("1", "Node 1", {
      shape: "circle",
      labelStyle: { stroke: "black" }
    }),
    Node("2", "Node 2", { shape: "diamond" }),
    Node("3", "Node 3", { shape: "rect" }),
    Node("4", "Node 4", {
      shapeStyle: { fill: "navy" },
      labelStyle: { stroke: "yellow" }
    }),
  ];

  const edges = [
    new Edge("1", "2", { markerEnd: "circle" }),
    new Edge("2", "3", {
      edgeStyle: { stroke: "red" },
      markerStyle: { stroke: "yellow", fill: "green" }
    }),
    new Edge("2", "4", { markerEnd: "none" }),
  ];

  return (
    <div class={c.demoArea}>
      <Graph nodes={nodes} edges={edges} />
      <Description example="style" text={description} />
    </div>
  );
  //--END
}
