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
  
  const graph = new Graph(nodes, edges);
  
  return (
    <div class={c.demoArea}>
      {graph.render()}
      <Description example="basic" text={description} />
    </div>
  );
