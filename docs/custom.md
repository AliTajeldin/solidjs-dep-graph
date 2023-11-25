# Customization
In addition to basic styling overrides, solidjs-dep-graph allows the user to define custom
shapes and markers.

# Custom Shapes
Custom shapes can be defined by extending the `Shape` class.
User is required to implement the following methods:
* `render`: return an SVG Element that renders the shape.  The rendered shape should be `width`x`height` and centered around (0,0).
* `shapeInfo`: return a "kld-intersections" `ShapeInfo` that defines the outline (at a minimum) of the shape.  This is used to determine intersection points of edges.

Once a custom shape class is defined, it can be registered as follows:
```typescript
Factory.registerShape(<shape id>, <shape instance>);
```
For example:
```typescript
Factory.registerShape("myhouse", new HouseShape());
```
**Note:** the shape instance is provided as second argument and not just the class.

Once registered, the custom class can be utilized in the same manner as any built-in shape:
```typescript
 new Node("id", "node", { shape: "myhouse" })
```

If the custom shape is defined by path element, then the `PathShape` class can be extended to provide the required `render` and `shapeInfo` methods and the user only has to provide a `path` method.  See example below.

## Example Custom Shape
```typescript
import { ShapeInfo, Shapes } from "kld-intersections";

class MyCircleShape implements Shape {
  render(width: number, height: number, style: StylePropsT) {
    return
      <circle cx={0} cy={0} r={20}/>
  }

  shapeInfo(width: number, height: number) : ShapeInfo {
    return Shapes.circle(0, 0, 20);
  }
}
```

## Example Path Custom Shape
```typescript
class HouseShape extends PathShape {
  path(width: number, height: number) {
    const xoff = width / 2;
    const yoff = height / 2;

    return `M -${xoff} ${yoff} L -${xoff} -${yoff / 2} L 0 -${yoff} L ${xoff} -${yoff / 2} L ${xoff} ${yoff} z`;
  }
}
```

# Custom Markers
Custom markers should implement a function that returns an html `marker` element.
The marker element `refX` and `refY` determine where the marker will attach to the shape.
Custom marker function must also set id of `marker` element to passed in `props.id` to link the marker defintion to edge in graph.
Additionaly, custom marker may utilize the `props.style` to use user provided marker style overrides.

Once a custom marker function is defined, it can be registered as follows:
```typescript
Factory.registerMarker(<marker id>, <marker function>);
```
For example:
```typescript
Factory.registerMarker("mymarker", MyMarker);
```
Once registered, the custom marker can be utilized in the same manner as any built-in marker:
```typescript
new Edge("N1", "N2", {markerEnd: "mymarker"});
```

## Example Custom Marker
```typescript
function BigRevArrowMarker(props: MarkerProps) {
  return (
    <marker
      id={props.id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="7"
      markerHeight="7"
      orient="auto-start-reverse"
    >
      <path d="M 10 0 L 10 10 L 0 5 z"/>
    </marker>
  );
}
```