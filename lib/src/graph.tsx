import { Component, createMemo, createSignal, For, JSX, mergeProps, Show } from "solid-js";
import { NodeC } from "./node";
import { Edge } from "./edge";
import { dagreLayout, LayoutOptions, DEFAULT_LAYOUT_OPTIONS } from "./dagre-layout";
import { borderStyle } from "./styles";
import { StylePropsT } from "./types";

export type { LayoutOptions };

interface GraphI {
  nodes: NodeC[],
  edges: Edge[],
  layoutOptions?: LayoutOptions,
  svgStyle?: StylePropsT,
}

export const Graph: Component<GraphI> = (props) => {
  // TODO: should these be a createMemo functions?
  const layoutOptions = () => {
    return Object.assign({}, DEFAULT_LAYOUT_OPTIONS, props.layoutOptions || {});
  }
  const svgStyle = () => props.svgStyle || {};

  const [getPanZoom, setPanZom] = createSignal({
    scale: 1,
    xOffset: 0,
    yOffset: 0,
  });

  // perform the actual layout.
  const size = createMemo(() => {
    return dagreLayout(props.nodes, props.edges, layoutOptions());
  });

  const handleWheel: JSX.EventHandler<SVGElement, WheelEvent> = (evt) => {
    evt.preventDefault();

    // scale the mouse move event to get reasonable smooth zoom rate
    const panZoom = getPanZoom();
    const deltaY = evt.deltaY;
    const normDeltaY = deltaY > 0 ?
      1 - Math.min(deltaY, 200) / 400 :
      (1 + -deltaY / 300);
    const newScale = Math.min(10, Math.max(0.25, normDeltaY * panZoom.scale))

    // adjust offset so pointer is in same spot on graph after zoom
    const offsetScale = -1.0 * newScale / panZoom.scale;
    const newXOffset = evt.offsetX + offsetScale * (-panZoom.xOffset + evt.offsetX);
    const newYOffset = evt.offsetY + offsetScale * (-panZoom.yOffset + evt.offsetY);

    setPanZom({
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

    setPanZom(panZoom => ({
      scale: panZoom.scale,
      xOffset: panZoom.xOffset + evt.movementX,
      yOffset: panZoom.yOffset + evt.movementY,
    }));

    evt.preventDefault();
    evt.stopImmediatePropagation();
  }

  // renders the nodes and edges of the graph.
  // also creates a rectangle same size as parent to accept pointer events (which will propagate to parent svg)
  // without such rect, svg will only get pointer events on painted nodes/edges.
  return (
    <Show when={size()}>
      <svg {...size()}
        preserveAspectRatio="none"
        pointer-events="visible"
        onMouseMove={handleMouseMove} onWheel={handleWheel}
        style={{ ...borderStyle, ...svgStyle() }}
      >
        <rect class="pointer-target" width="100%" height="100%" style="fill: transparent" />
        <g pointer-events="none"
          transform={`matrix(${getPanZoom().scale} 0 0 ${getPanZoom().scale} ${getPanZoom().xOffset} ${getPanZoom().yOffset})`}>
          <For each={props.nodes}>
            {(n) => n.render()}
          </For>
          <For each={props.edges}>
            {(e) => e.render()}
          </For>
        </g>
      </svg>
    </Show>
  );
}
