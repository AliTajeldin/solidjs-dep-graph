import { Shape } from "./types";
import { BUILTIN_SHAPES } from "./shapes";

export class Factory {
  private static _instance : Factory;
  private _shapes = BUILTIN_SHAPES;

  static get instance() : Factory {
    if (!this._instance) this._instance = new Factory();
    return this._instance;
  }

  getShape(shapeName: string) : Shape {
    return this._shapes[shapeName];
  }
}
