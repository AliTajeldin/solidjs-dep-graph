import { Shape } from "./types";
import { BUILTIN_SHAPES } from "./shapes";
import { BUILTIN_MARKERS } from "./markers";

export class Factory {
  private static _instance : Factory;
  private _shapes = BUILTIN_SHAPES; // TODO: add custom shapes/markers
  private _markers = BUILTIN_MARKERS;

  static get instance() : Factory {
    if (!this._instance) this._instance = new Factory();
    return this._instance;
  }

  getShape(shapeName: string) : Shape {
    return this._shapes[shapeName];
  }

  getMarker(markerType: string) {
    return this._markers[markerType];
  }
}
