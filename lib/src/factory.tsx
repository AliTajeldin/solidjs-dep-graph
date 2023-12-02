import { BUILTIN_SHAPES, DEFUALT_SHAPE, Shape } from "./shapes";
import { BUILTIN_MARKERS, MarkerComponent } from "./markers";

export class Factory {
  private static _instance: Factory;
  private _shapes: Record<string, Shape> = { ...BUILTIN_SHAPES };
  private _markers: Record<string, MarkerComponent> = { ...BUILTIN_MARKERS };

  private static get instance(): Factory {
    if (!this._instance) this._instance = new Factory();
    return this._instance;
  }

  static getShape(shapeName: string): Shape {
    let shape;
    if (!shapeName || !(shape = Factory.instance._shapes[shapeName])) {
      console.error("unknown/invalid shape name provided:", shapeName)
      return DEFUALT_SHAPE;
    }
    return shape;
  }

  static registerShape(shapeName: string, shape: Shape) {
    Factory.instance._shapes[shapeName] = shape;
  }

  static getMarker(markerType: string ): MarkerComponent | undefined {
    let marker;
    if (markerType === "none" || !(marker = Factory.instance._markers[markerType]))
      return undefined;
    return marker;
  }

  static registerMarker(markerType: string, marker: MarkerComponent) {
    Factory.instance._markers[markerType] = marker;
  }
}
