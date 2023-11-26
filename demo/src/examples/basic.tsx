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
    Node("1", "Node 1"),
    Node("2", "Node 2"),
    Node("3", "Node 3"),
    Node("4", "Node 4"),
    Node("5", "Node 5"),
    Node("6", "Node 6"),
  ];

  const edges = [
    Edge("1", "2"),
    Edge("2", "3"),
    Edge("2", "4"),
    Edge("1", "5"),
    Edge("1", "6"),
  ];

  return (
    <div class={c.demoArea}>
      <Graph nodes={nodes} edges={edges} />
      <Description example="basic" text={description} />
    </div>
  );
  //--END
}
