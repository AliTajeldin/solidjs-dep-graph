async function fetchGraphInfo(): Promise<GraphInfo> {
  const nodes = [
    Node("1", "Node 1"),
    Node("2", "Node 2"),
    Node("3", "Node 3"),

  ];
  const edges = [
    Edge("1", "2"),
    Edge("1", "3"),
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
