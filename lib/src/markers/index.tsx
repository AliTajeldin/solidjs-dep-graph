import { ArrowMarker } from "./arrow-marker";
import { CircleMarker } from "./circle-marker";
import type { MarkerProps, MarkerComponent } from "./marker-types";

export { MarkerProps, MarkerComponent }

export const BUILTIN_MARKERS: Record<string, MarkerComponent> = {
  "arrow": ArrowMarker,
  "circle": CircleMarker,
  "none": null,
};
