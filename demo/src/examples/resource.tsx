import { createResource, Show } from "solid-js";
import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from '../style.module.css';
import { Description } from "../description";

interface GraphInfo {
  nodes: ReturnType<typeof Node>[];
  edges: Edge[];
}

const description = <>
  An example of graph info being loaded as a resource.<br />
  an explicit 1 sec delay is added to the fetch to simulate<br />
  a real fetch operation.<br />
  <br />
</>

//--BEGIN
async function fetchGraphInfo(): Promise<GraphInfo> {
  const nodes = [
    Node("1", "Node 1"),
    Node("2", "Node 2"),
    Node("3", "Node 3"),

  ];
  const edges = [
    new Edge("1", "2",),
    new Edge("1", "3",),
  ];

  // simulate a slight delay
  await new Promise(r => setTimeout(r, 1000));

  return {nodes, edges}
}

export default function ResourceExample() {
  const [graphInfo] = createResource(fetchGraphInfo);

  return (
    <div class={c.demoArea}>
      <Show when={graphInfo.state === "ready"} fallback={<p>Loading...</p>}>
        <Graph nodes={graphInfo().nodes} edges={graphInfo().edges}/>
      </Show>
      <Description example="resource" text={description} />
    </div>
  );
}
//--END
