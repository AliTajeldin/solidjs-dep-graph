import { graphlib, layout } from "dagre";
import { Accessor, createSignal, For, JSX, Setter } from "solid-js";
import { Node } from "../models/node";
import { Edge } from "../models/edge";
import { renderDebugMsg, showMouseEvent } from "~/components/debug-msg";

export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};

const DEFAULT_LAYOUT_OPTIONS :  LayoutOptions = {
  marginx: 10,
  marginy: 10,
  rankdir: 'LR',
  ranksep: 30,
  nodesep: 20,
};

// add width, height as they are added during layout by Dagre
interface InternalLayoutOptions extends LayoutOptions {
  width?: number,
  height?: number,
};

interface PanZoom {
  scale: number,
  xOffset: number,
  yOffset: number,
};

export class Graph {
  nodes: Node[];
  edges: Edge[];
  layoutOptions: InternalLayoutOptions;
  readonly getPanZoom : Accessor<PanZoom>;
  readonly setPanZoom : Setter<PanZoom>;

  constructor(nodes: Node[] = [], edges: Edge[] = [], userLayoutOptions: LayoutOptions = {}) {
    this.nodes = nodes;
    this.edges = edges;

    this.layoutOptions = Object.assign({}, DEFAULT_LAYOUT_OPTIONS, userLayoutOptions);

    [this.getPanZoom, this.setPanZoom] = createSignal({
      scale: 1,
      xOffset: 0,
      yOffset: 0,
    });
  }

  getWidth() { return this.layoutOptions.width }
  getHeight() { return this.layoutOptions.height }

  layout() {
    const graph = new graphlib.Graph();
    graph.setGraph(this.layoutOptions);
    graph.setDefaultEdgeLabel(() => { return {} });

    this.nodes.forEach((n) => graph.setNode(n.id, n));
    this.edges.forEach((e) => graph.setEdge(e.from, e.to, e));

    layout(graph);
  }

  private handleWheel: JSX.EventHandler<SVGElement, WheelEvent> = (evt) => {
    evt.preventDefault();

    // scale the mouse move event to get reasonable smooth zoom rate
    const panZoom = this.getPanZoom();
    const deltaY = evt.deltaY;
    const normDeltaY = deltaY > 0 ?
      1 - Math.min(deltaY, 200) / 400 :
      (1 + -deltaY / 300);
    const newScale = Math.min(10, Math.max(0.25, normDeltaY * panZoom.scale))

    // adjust offset so pointer is in same spot on graph after zoom
    const offsetScale = -1.0 * newScale / panZoom.scale;
    const newXOffset = evt.offsetX + offsetScale * (-panZoom.xOffset + evt.offsetX);
    const newYOffset = evt.offsetY + offsetScale * (-panZoom.yOffset + evt.offsetY);

    this.setPanZoom({
      scale: newScale,
      xOffset: newXOffset,
      yOffset: newYOffset,
    });
  };

  private handleMouseMove: JSX.EventHandler<SVGElement, MouseEvent> = (evt) => {
    showMouseEvent(evt);
    // only do pan when mouse moves while only button 1 is pressed
    if (evt.buttons != 1) return;

    const panZoom = this.getPanZoom();
    this.setPanZoom({
      scale: panZoom.scale,
      xOffset: panZoom.xOffset + evt.movementX,
      yOffset: panZoom.yOffset + evt.movementY,
    });
    evt.preventDefault();
    evt.stopImmediatePropagation();
  }

  // renders the nodes and edges of the graph.
  // also creates a rectangle same size as parent to accept pointer events (which will propagate to parent svg)
  // without such rect, svg will only get pointer events on painted nodes/edges.
  render() {
    const pz = this.getPanZoom;
    return (
      <svg pointer-events="visible"
        onMouseMove={this.handleMouseMove} onWheel={this.handleWheel}
      >
        <rect class="pointer-target fill-transparent" width="100%" height="100%" />
        <g pointer-events="none"
          transform={`matrix(${pz().scale} 0 0 ${pz().scale} ${pz().xOffset} ${pz().yOffset})`}>
          <For each={this.nodes}>
            {(n) => n.render()}
          </For>
          <For each={this.edges}>
            {(e) => e.render()}
          </For>
        </g>
        {renderDebugMsg()}
      </svg>
    );
  }

  dump() {
    console.log("Layout =", this.layoutOptions);
    this.nodes.forEach(n => console.log(`Node(${n.id}) = `, n));
    this.edges.forEach(e => console.log(`Edge(${e.from}, ${e.to}) = `, e));
  }
}