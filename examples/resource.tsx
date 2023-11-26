async function fetchGraphInfo(): Promise<Graph> {
  const nodes = [
    new Node("1", "Node 1"),
    new Node("2", "Node 2"),
    new Node("3", "Node 3"),

  ];
  const edges = [
    new Edge("1", "2",),
    new Edge("1", "3",),
  ];

  // simulate a slight delay
  await new Promise(r => setTimeout(r, 1000));
  return new Graph(nodes, edges);
}

export default function ResourceExample() {
  const [graph] = createResource(fetchGraphInfo);

  return (
    <div class={c.demoArea}>
      <Show when={graph.state === "ready"} fallback={<p>Loading...</p>}>
        {graph().render()}
      </Show>
      <Description example="resource" text={description} />
    </div>
  );
}
