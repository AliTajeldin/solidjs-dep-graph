import { MarkerProps } from "./marker-types";
import { markerStyle } from '../styles';

export function ArrowMarker(props: MarkerProps) {
  return (
    <marker
      id={props.id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="6"
      markerHeight="4"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" style={{
        ...markerStyle,
        ...props.markerStyle
      }} />
    </marker>
  );
}
