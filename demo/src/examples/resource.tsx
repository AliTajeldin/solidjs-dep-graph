import { createResource, Show } from "solid-js";
import { Node, Edge, Graph } from "solidjs-dep-graph";
import c from '../style.module.css';

interface GraphInfo {
  nodes: Node[];
  edges: Edge[];
}

const data: GraphInfo = {
  nodes: [
    new Node("1", "Node 1"),
    new Node("2", "Node 2"),
    new Node("3", "Node 3"),

  ],
  edges: [
    new Edge("1", "2",),
    new Edge("1", "3",),
  ]
};

async function fetchGraphInfo(): Promise<GraphInfo> {
  // simulate a slight delay
  await new Promise(r => setTimeout(r, 1000));
  return data;
}

export default function ResourceExample() {
  const [graphInfo] = createResource(fetchGraphInfo);

  return (
    <div class={c.demoArea} style="margin: 25px">
      <Show when={graphInfo()} fallback={<p>Loading...</p>}>
        <Graph {...graphInfo()} />
      </Show>
      <div class={c.demoDescription}>
        An example of graph info being loaded as a resource.<br />
        an explicit 1 sec delay is added to the fetch to simulate<br/>
        a real fetch operation.<br/>
      </div>
    </div>
  );
}
