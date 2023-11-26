/**
 * For custom path shapes, we only need to implement the `path` method.
 */
class HouseShape extends PathShape {
  path(width: number, height: number) {
    const xoff = width / 2;
    const yoff = height / 2;

    return `M -${xoff} ${yoff} L -${xoff} -${yoff / 2} L 0 -${yoff} L ${xoff} -${yoff / 2} L ${xoff} ${yoff} z`;
  }
}

export function BigRevArrowMarker(props: MarkerProps) {
  return (
    <marker
      id={props.id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path d="M 10 0 L 10 10 L 0 5 z" style={{
        ...markerStyle,
        ...props.markerStyle
      }} />
    </marker>
  );
}

export default function CustomExample() {
  Factory.registerShape("house", new HouseShape());
  Factory.registerMarker("big-rev-arrow", BigRevArrowMarker);
  const cb = (n: ReturnType<typeof Node>) => { console.log("Double click:", n.id); }

  const nodes = [
    Node("1", "", { shape: "image", imageUrl: "/solidjs-dep-graph/linux.png", height: 30, width: 30, dblClickCB: cb }),
    Node("2", "Node 2", { shape: "house", shapeStyle: { fill: colors.blue2, } }),
    Node("3", "Node 3", { dblClickCB: cb }),
    Node("4", "Node 4", { width: 100, height: 50, shape: "house" }),
  ];
  const edges = [
    Edge("1", "2", { markerEnd: "circle", }),
    Edge("2", "3", {
      markerStart: "circle",
      markerEnd: "big-rev-arrow",
      markerStyle: { stroke: "yellow", fill: "green" }
    }),
    Edge("2", "4"),
  ];

  return (
    <div class={c.demoArea} style="flex-grow:1">
      <Graph nodes={nodes} edges={edges}
        layoutOptions={{ rankdir: "TB" }}
        svgStyle={{ height: "100%" }} />

      <Description example="custom" text={description} />
    </div>
  );
}
