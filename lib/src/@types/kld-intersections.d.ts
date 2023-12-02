declare module "kld-intersections" {
  interface Point2D {
    x: number; y: number;
  }

  class ShapeInfo { }

  namespace Shapes {
    function line(x: number, y: number, w: number, h: number): ShapeInfo;
    function circle(x: number, y: number, r: number): ShapeInfo;
    function path(p: string): ShapeInfo;
    function rectangle(x: number, y: number, w: number, h: number, rx?: number, ry?: number): ShapeInfo;
  }

  namespace Intersection {
    function intersect(s1: ShapeInfo, s2: ShapeInfo): {
      status: string;
      points: Array<Point2D>;
    };
  }
}
