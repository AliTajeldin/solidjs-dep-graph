import { MarkerProps } from "./marker-types";
import { markerStyle } from '../styles';

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
      <circle cx="6" cy="6" r="5" style={{
        ...markerStyle,
        ...props.markerStyle
      }}
      />
    </marker>
  );
}