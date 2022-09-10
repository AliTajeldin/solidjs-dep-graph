import { ShapeInfo, Shapes } from "kld-intersections";
import { Node, Edge, Graph, colors } from "solidjs-dep-graph";
import { Shape, StylePropsT, shapeStyle, Factory } from "solidjs-dep-graph";
import { MarkerProps, markerStyle } from "solidjs-dep-graph";
import c from '../style.module.css';


/**
 * custom shapes must implement the `render` and `shapeInfo` methods.
 */
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
  const cb = (n:Node) => {console.log("Double click:", n.id); }

  const nodes: Node[] = [
    new Node("1", "Node 1", {dblClickCB:cb}),
    new Node("2", "Node 2", { shape: "house", shapeStyle: { fill: colors.blue2, } }),
    new Node("3", "Node 3", {dblClickCB:cb}),
    new Node("4", "Node 4", { shape: "house" }),
  ];
  const edges: Edge[] = [
    new Edge("1", "2",{ endMarkerType: "circle",}),
    new Edge("2", "3", {
      endMarkerType: "big-rev-arrow",
      markerStyle: { stroke: "yellow", fill: "green" }
    }),
    new Edge("2", "4"),
  ];

  return (
    <div class={c.demoArea} style="margin: 25px">
      <Graph nodes={nodes} edges={edges} />
      <div class={c.demoDescription}>
      Custom shapes and markers can be used by simply registering them
        with the `Factory`.<br/>
        User styles can still be applied over custom shapes/markers.<br/>
        Nodes 1 and 3 also have a double click callback attached to them.
      </div>
    </div>
  );
}
