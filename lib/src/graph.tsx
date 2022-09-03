import { createSignal, For, JSX } from "solid-js";
import { Node } from "./node";
import { Edge } from "./edge";
// import { renderDebugMsg, showMouseEvent } from "./debug-msg";
import { dagreLayout, LayoutOptions } from "./dagre-layout";
import { borderStyle } from "./styles";

export type { LayoutOptions };

interface PanZoom {
  scale: number,
  xOffset: number,
  yOffset: number,
};

export interface GraphOptions {
  nodes: Node[];
  edges: Edge[];
  layoutOptions?: LayoutOptions;
}

export function Graph(props: GraphOptions) {
  const [pz, setPanZoom] = createSignal({
    scale: 1,
    xOffset: 0,
    yOffset: 0,
  });

  const size = dagreLayout(props.nodes, props.edges, props.layoutOptions);

  const handleWheel: JSX.EventHandler<SVGElement, WheelEvent> = (evt) => {
    evt.preventDefault();

    // scale the mouse move event to get reasonable smooth zoom rate
    const panZoom = pz();
    const deltaY = evt.deltaY;
    const normDeltaY = deltaY > 0 ?
      1 - Math.min(deltaY, 200) / 400 :
      (1 + -deltaY / 300);
    const newScale = Math.min(10, Math.max(0.25, normDeltaY * panZoom.scale))

    // adjust offset so pointer is in same spot on graph after zoom
    const offsetScale = -1.0 * newScale / panZoom.scale;
    const newXOffset = evt.offsetX + offsetScale * (-panZoom.xOffset + evt.offsetX);
    const newYOffset = evt.offsetY + offsetScale * (-panZoom.yOffset + evt.offsetY);

    setPanZoom({
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

    const panZoom = pz();
    setPanZoom({
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
  return (
    <svg width={size.width} height={size.height}
      preserveAspectRatio="none"
      pointer-events="visible"
      onMouseMove={handleMouseMove} onWheel={handleWheel}
      style={borderStyle}
    >
      <rect class="pointer-target" width="100%" height="100%" style="fill: transparent" />
      <g pointer-events="none"
        transform={`matrix(${pz().scale} 0 0 ${pz().scale} ${pz().xOffset} ${pz().yOffset})`}>
        <For each={Array.from(props.nodes.values())}>
          {(n) => n.render()}
        </For>
        <For each={props.edges}>
          {(e) => e.render()}
        </For>
      </g>
      {/* {renderDebugMsg()} */}
    </svg>
  );
}
