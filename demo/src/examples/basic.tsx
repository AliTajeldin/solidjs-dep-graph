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
    Node("N1"), Node("N2"), Node("N3"),
    Node("N4"), Node("N5"), Node("N6"),
  ];

  const edges = [
    Edge("N1", "N2"),
    Edge("N2", "N3"),
    Edge("N2", "N4"),
    Edge("N1", "N5"),
    Edge("N1", "N6"),
  ];

  return (
    <div class={c.demoArea}>
      <Graph nodes={nodes} edges={edges} />
      <Description example="basic" text={description} />
    </div>
  );
  //--END
}
