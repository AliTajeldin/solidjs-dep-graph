import { graphlib, layout } from "dagre";
import { createEffect, createSignal, For, JSX, onMount } from "solid-js";
import { Node } from "../models/node";
import { Edge } from "../models/edge";
import { renderDebugMsg, setDebugMsg, watchMouseMove } from "~/components/debug-msg";

export interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};

// add width, height as they are added during layout by Dagre
interface InternalLayoutOptions extends LayoutOptions {
  width?: number,
  height?: number,
};

// TODO: make this part of the Graph instance (so multiple graphs can have own scale)
const [ getPanZoom, setPanZoom ] = createSignal({
  scale: 1,
  xOffset: 0,
  yOffset: 0,
});


// TODO: add resize handler window.onResize and get innnerHeight/Width of enclosing window!
// TODO: scale graph to fit view port if graph is too big or always or none.  Or just add a fit() method
// TODO: use store instead of individual signals.
// FIXME: disable highlight of node text on double click
export class Graph {
  nodes: Node[];
  edges: Edge[];
  layoutOptions: InternalLayoutOptions;

  constructor(nodes: Node[] = [], edges: Edge[] = []) {
    this.nodes = nodes;
    this.edges = edges;

    // TODO: accept as an option override
    this.layoutOptions = {
      marginx: 15,
      marginy: 15,
      rankdir: 'LR',
      ranksep: 55,
      nodesep: 35,
    };
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

  render() {
    let svgRef;
    onMount(() => {
      watchMouseMove(svgRef);

      // TODO: look into using .onmousemove attr instead of event listner
      svgRef.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        console.log('evt =', evt);
        console.log('svg bounding box =', svgRef.getBoundingClientRect());
        
        const panZoom = getPanZoom();
        const deltaY = evt.deltaY;
        const normDeltaY =  deltaY > 0 ?
          1 - Math.min(deltaY, 200) / 400 :
          (1 + -deltaY / 300);
        // const newScale = Math.min(10, Math.max(0.25, normDeltaY * panZoom.scale))
        const newScale = 2 * panZoom.scale;
        setDebugMsg(`scale = ${newScale}`);
        setPanZoom({
          scale: newScale,
          xOffset: panZoom.xOffset,
          yOffset: panZoom.yOffset,
        });
      });
    });

    // FIXME: should do pan by button down/up so only handle move when button is down.
    // FIXME: if above is implemented than we can fix offset at end to remove pan drift.
    const handleMouseMove : JSX.EventHandler<SVGElement, MouseEvent>= (evt) => {
      // only do pan when mouse moves while only button 1 is pressed
      if (evt.buttons != 1) return;

      const panZoom = getPanZoom();
      setPanZoom({
        scale: panZoom.scale,
        xOffset: panZoom.xOffset + evt.movementX,
        yOffset: panZoom.yOffset + evt.movementY,
      });
      evt.preventDefault();
    }

    return (
      <svg ref={svgRef} pointer-events="visible" onMouseMove={handleMouseMove}>
        {/* bg rect to accept pointer events (propagates to parent svg) */}
        <rect class="pointer-target fill-transparent" width="100%" height="100%"/>
        <g pointer-events="none"
        transform={`matrix(${getPanZoom().scale} 0 0 ${getPanZoom().scale} ${getPanZoom().xOffset} ${getPanZoom().yOffset})`}>
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
    this.edges.forEach(e => console.log(`Edge(${e.label}) = `, e));
  }
}