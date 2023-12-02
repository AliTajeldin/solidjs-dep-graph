import { graphlib, layout } from "dagre";
import { NodeC } from "./node";
import { EdgeC } from "./edge";
import { Size } from "./types";

export interface DagreLayoutOptionsI {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};

const DEFAULT_LAYOUT_OPTIONS: DagreLayoutOptionsI = {
  marginx: 20,
  marginy: 20,
  rankdir: 'LR',
  ranksep: 55,
  nodesep: 35,
};

// add width, height as they are added during layout by Dagre
interface InternalLayoutOptions extends DagreLayoutOptionsI {
  width?: number,
  height?: number,
};

export function dagreLayout(
  nodes: NodeC[],
  edges: EdgeC[],
  userLayoutOptions: DagreLayoutOptionsI
): Size | undefined {

  if (typeof(nodes) === "undefined" || typeof(edges) == "undefined") {
    return undefined;
  }

  const layoutOptions: InternalLayoutOptions = {...DEFAULT_LAYOUT_OPTIONS, ...userLayoutOptions};
  const graph = new graphlib.Graph();
  graph.setGraph(layoutOptions);

  const nodeMap: Record<string, NodeC> = {};
  nodes.forEach((n) => {
    graph.setNode(n.id, n);
    nodeMap[n.id] = n;
  });
  edges.forEach((e) => graph.setEdge(e.from, e.to, e));

  layout(graph);

  // adjust edges so first/last points move to intersection point with the to/from node.
  edges.forEach((e) => {
    const points = e.points!;
    const fromNode = nodeMap[e.from];
    const toNode = nodeMap[e.to];
    const lastIdx = points.length - 1;
    if (lastIdx < 2) {
      throw new Error(`too few edge points to go on Edge(${e.from},${e.to})`)
    }

    points[0] = fromNode.intersect(points[1]);
    points[lastIdx] = toNode.intersect(points[lastIdx - 1]);
  });

  return new Size(layoutOptions.width!, layoutOptions.height!);
}