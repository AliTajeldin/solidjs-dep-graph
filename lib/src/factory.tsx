import { BUILTIN_SHAPES, Shape } from "./shapes";
import { BUILTIN_MARKERS, MarkerComponent } from "./markers";

export class Factory {
  private static _instance : Factory;
  private _shapes = BUILTIN_SHAPES;
  private _markers = BUILTIN_MARKERS;

  private static get instance() : Factory {
    if (!this._instance) this._instance = new Factory();
    return this._instance;
  }

  static getShape(shapeName: string) : Shape {
    return Factory.instance._shapes[shapeName];
  }

  static registerShape(shapeName: string, shape: Shape) {
    Factory.instance._shapes[shapeName] = shape;
  }

  static getMarker(markerType: string) : MarkerComponent{
    return Factory.instance._markers[markerType];
  }

  static registerMarker(markerType: string, marker: MarkerComponent) {
    Factory.instance._markers[markerType] = marker;
  }
}
