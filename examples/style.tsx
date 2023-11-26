  const nodes = [
    new Node("1", "Node 1", {
      shape: "circle",
      labelStyle: { stroke: "black" }
    }),
    new Node("2", "Node 2", { shape: "diamond" }),
    new Node("3", "Node 3", { shape: "rect" }),
    new Node("4", "Node 4", {
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

  const graph = new Graph(nodes, edges);

  return (
    <div class={c.demoArea}>
      {graph.render()}
      <Description example="style" text={description} />
    </div>
  );
