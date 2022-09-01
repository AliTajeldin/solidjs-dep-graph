import { Component } from "solid-js";
import { StylePropsT } from "../types";

export interface MarkerProps {
  id: string,
  markerStyle: StylePropsT,
};

export type MarkerComponent = Component<MarkerProps>;
