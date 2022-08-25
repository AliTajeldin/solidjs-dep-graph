import { MarkerProps } from "./marker-types";

export function CircleMarker(props: MarkerProps) {
  return (
    <marker
    id={props.id}
    viewBox="0 0 12 12"
    refX="12"
    refY="6"
    markerUnits="strokeWidth"
    markerWidth="6"
    markerHeight="6"
    orient="auto-start-reverse"
  >
    <circle cx="6" cy="6" r="5"
      class="stroke-graph-edge fill-graph-edge stroke-[1px]"
      style={props.markerStyle}
    />
  </marker>
  );
}