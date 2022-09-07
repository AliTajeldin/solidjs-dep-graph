import { createResource, Show, Suspense } from "solid-js";
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
  console.log('fetchGraphInfo start');
  await new Promise(r => setTimeout(r, 2000));
  console.log('fetchGraphInfo end');
  return data;
}

export default function ResourceExample() {
  const [graphInfo] = createResource(fetchGraphInfo);

  return (
    <div class={c.demoArea} style="margin: 25px">
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={graphInfo()} fallback={<p>Loading Show!!!</p>}>
          {(info) =>
            <Graph {...info} />
          }
        </Show>
      </Suspense>
      <div class={c.demoDescription}>
        An example of graph info being loaded as a resource.<br/>
        This is broken now and requires a "Show" hack to delta<br/>
        first render until the info has been fetched.
      </div>
    </div>
  );
}
