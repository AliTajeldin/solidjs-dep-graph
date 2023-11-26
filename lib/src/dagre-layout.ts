import { graphlib, layout } from "dagre";
import { NodeC } from "./node";
import { Edge } from "./edge";
import { Size } from "./types";

export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};

export const DEFAULT_LAYOUT_OPTIONS: LayoutOptions = {
  marginx: 20,
  marginy: 20,
  rankdir: 'LR',
  ranksep: 55,
  nodesep: 35,
};

// add width, height as they are added during layout by Dagre
interface InternalLayoutOptions extends LayoutOptions {
  width?: number,
  height?: number,
};

export function dagreLayout(
  nodes: NodeC[],
  edges: Edge[],
  userLayoutOptions: LayoutOptions
): Size | undefined {

  if (typeof(nodes) === "undefined" || typeof(edges) == "undefined") {
    return undefined;
  }

  const layoutOptions: InternalLayoutOptions = {...userLayoutOptions};
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
    const fromNode = nodeMap[e.from];
    const toNode = nodeMap[e.to];
    const lastIdx = e.points.length - 1;
    if (lastIdx < 2) {
      throw new Error(`too few edge points to go on Edge(${e.from},${e.to})`)
    }

    e.points[0] = fromNode.intersect(e.points[1]);
    e.points[lastIdx] = toNode.intersect(e.points[lastIdx - 1]);
  });

  return new Size(layoutOptions.width, layoutOptions.height);
}