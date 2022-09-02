import { ShapeInfo, Shapes } from "kld-intersections";
import { Node, Edge, Graph, colors } from "solidjs-dep-graph";
import { Shape, StylePropsT, shapeStyle, Factory } from "solidjs-dep-graph";

class HouseShape implements Shape {
  private pathString(width: number, height: number) {
    const xoff = width / 2;
    const yoff = height / 2;

    return `M -${xoff} ${yoff} L -${xoff} -${yoff / 2} L 0 -${yoff} L ${xoff} -${yoff / 2} L ${xoff} ${yoff} z`;
  }

  render(width: number, height: number, style: StylePropsT) {
    return (
      <path d={this.pathString(width, height)} style={{
        ...shapeStyle,
        ...style
      }} />
    );
  }

  shapeInfo(width: number, height: number): ShapeInfo {
    return Shapes.path(this.pathString(width, height));
  }
}


export default function Custom() {
  Factory.registerShape("house", new HouseShape());

  const nodes: Node[] = [
    new Node("1", "Node 1"),
    new Node("2", "Node 2", { shape: "house", shapeStyle: { fill: colors.blue2, } }),
    new Node("3", "Node 3"),
    new Node("4", "Node 4", { shape: "house" }),
  ];
  const edges: Edge[] = [
    new Edge("1", "2",),
    new Edge("2", "3",),
    new Edge("2", "4"),
  ];

  return (
    <div style="margin: 30px">
      <Graph nodes={nodes} edges={edges} />
    </div>
  );
}
