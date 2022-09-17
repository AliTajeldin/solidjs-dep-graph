import { createMemo, createSignal, For, JSX, Show } from "solid-js";
import { Node } from "./node";
import { Edge } from "./edge";
import { dagreLayout, LayoutOptions, DEFAULT_LAYOUT_OPTIONS } from "./dagre-layout";
import { borderStyle } from "./styles";
import { StylePropsT } from "./types";

export type { LayoutOptions };

// wrapper around createSignal to use get/set instead of array return.
function Signal<T>(v: T) {
  const [getSig, setSig] = createSignal(v);

  return {
    get: getSig,
    set: setSig,
  }
}

export class Graph {
  nodes: Node[];
  edges: Edge[];
  layoutOptions: LayoutOptions = DEFAULT_LAYOUT_OPTIONS;
  svgStyle: StylePropsT = {};

  panZoom = Signal({
    scale: 1,
    xOffset: 0,
    yOffset: 0,
  });

  constructor(nodes: Node[], edges: Edge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  setLayoutOptions(layoutOptions: LayoutOptions) {
    this.layoutOptions = Object.assign({}, this.layoutOptions, layoutOptions);
    return this;
  }

  setSvgStyle(svgStyle: StylePropsT) {
    this.svgStyle = svgStyle;
    return this;
  }

  render() {
    // perform the actual layout.
    const size = createMemo(() => {
      return dagreLayout(this.nodes, this.edges, this.layoutOptions);
    });

    const handleWheel: JSX.EventHandler<SVGElement, WheelEvent> = (evt) => {
      evt.preventDefault();

      // scale the mouse move event to get reasonable smooth zoom rate
      const panZoom = this.panZoom.get();
      const deltaY = evt.deltaY;
      const normDeltaY = deltaY > 0 ?
        1 - Math.min(deltaY, 200) / 400 :
        (1 + -deltaY / 300);
      const newScale = Math.min(10, Math.max(0.25, normDeltaY * panZoom.scale))

      // adjust offset so pointer is in same spot on graph after zoom
      const offsetScale = -1.0 * newScale / panZoom.scale;
      const newXOffset = evt.offsetX + offsetScale * (-panZoom.xOffset + evt.offsetX);
      const newYOffset = evt.offsetY + offsetScale * (-panZoom.yOffset + evt.offsetY);

      this.panZoom.set({
        scale: newScale,
        xOffset: newXOffset,
        yOffset: newYOffset,
      });
    };

    const handleMouseMove: JSX.EventHandler<SVGElement, MouseEvent> = (evt) => {
      // uncomment to show debug msg with location on graph!
      // showMouseEvent(evt);

      // only do pan when mouse moves while only button 1 is pressed
      if (evt.buttons != 1) return;

      const panZoom = this.panZoom.get();
      this.panZoom.set({
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
    const pz = this.panZoom.get;
    return (
      <Show when={size()}>
        <svg {...size()}
          preserveAspectRatio="none"
          pointer-events="visible"
          onMouseMove={handleMouseMove} onWheel={handleWheel}
          style={{ ...borderStyle, ...this.svgStyle }}
        >
          <rect class="pointer-target" width="100%" height="100%" style="fill: transparent" />
          <g pointer-events="none"
            transform={`matrix(${pz().scale} 0 0 ${pz().scale} ${pz().xOffset} ${pz().yOffset})`}>
            <For each={this.nodes}>
              {(n) => n.render()}
            </For>
            <For each={this.edges}>
              {(e) => e.render()}
            </For>
          </g>
        </svg>
      </Show>
    );
  }
}
