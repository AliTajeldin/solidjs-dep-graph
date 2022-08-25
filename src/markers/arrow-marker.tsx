import { MarkerProps } from "./marker-types";

export function ArrowMarker(props: MarkerProps) {
  return (
    <marker
    id={props.id}
    viewBox="0 0 10 10"
    refX="9"
    refY="5"
    markerUnits="strokeWidth"
    markerWidth="8"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <path class="stroke-graph-edge fill-graph-edge"
      d="M 0 0 L 10 5 L 0 10 z"
      style={props.markerStyle}
    ></path>
  </marker>

  );
}

const x = ArrowMarker;
