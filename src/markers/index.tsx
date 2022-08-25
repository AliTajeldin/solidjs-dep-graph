import { Component } from "solid-js";
import { ArrowMarker } from "./arrow-marker";
import { CircleMarker } from "./circle-marker";
import { MarkerProps } from "./marker-types";

export const BUILTIN_MARKERS: Record<string, Component<MarkerProps>> = {
  "arrow": ArrowMarker,
  "circle": CircleMarker,
  "none": null,
};
