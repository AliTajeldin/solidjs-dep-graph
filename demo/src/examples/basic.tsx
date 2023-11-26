import { Node, Edge, Graph } from "solidjs-dep-graph";
import { Code } from '../code';
import { Description } from "../description";
import c from '../style.module.css';


export default function BasicExample() {
  const description = <>
    An example of simplest graph.<br />Only two properties are required to be specified:
    <ul>
      <li>nodes: array of Node objects</li>
      <li>edges: array of Edge objects</li>
    </ul>
  </>

  //--BEGIN
  const nodes = [
    new Node("1", "Node 1"),
    new Node("2", "Node 2"),
    new Node("3", "Node 3"),
    new Node("4", "Node 4"),
    new Node("5", "Node 5"),
    new Node("6", "Node 6"),
  ];

  const edges = [
    new Edge("1", "2",),
    new Edge("2", "3",),
    new Edge("2", "4"),
    new Edge("1", "5"),
    new Edge("1", "6",),
  ];

  return (
    <div class={c.demoArea}>
      <Graph nodes={nodes} edges={edges} />
      <Description example="basic" text={description} />
    </div>
  );
  //--END
}
