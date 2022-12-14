# Graph API

All `Graph` options are optional except for `nodes` and `edges`


```typescript
<Graph ...GraphOptions />
```

```typescript
interface GraphOptions {
  nodes: Node[];
  edges: Edge[];
  layoutOptions?: LayoutOptions;
  svgStyle?: StylePropsT;
}
```

`nodes` and `edges` must be specified and denote the list of nodes and the edges that connect them.
They must be instances of `Node` and `Edge` classes or their derivatives respectively.

The `svgStyle` optional style can be used to override the style of the top level `svg` element rendered by the graph.
For example, to turn off the border, pass `svgStyle={{"border-width":0}}` as a prop argument.

## Graph Layout options
All layout options are optional

```typescript
interface LayoutOptions {
  rankdir?: string,
  marginx?: number,
  marginy?: number,
  ranksep?: number,
  nodesep?: number,
};
```
* `rankdir` : Layout direction.  Left to right (`'LR'`) or Top to Bottom (`'TB'`). (Default: `'LR'`)
* `marginx`/`marginy` : horizontal / vertical margin around graph inside SVG in pixels. (Default: 20)
* `ranksep` : space between nodes levels/ranks. (Default: 55)
* `ranksep` : space between nodes on same level. (Default: 35)

# Node API
```typescript
new Node(node_id, node_label, node_options)
```
* `node_id` : must be unique for a given graph.  Same id can be reused across multiple graphs.  The id used as parameter to `Edge` to link nodes together.
* `node_label`: can be any arbitrary label.  The size of the rendered node will expand to fit the node label.
* `node_options`: determine what shape/style is used to render node.  See below.

## Node options
```typescript
interface NodeOptions {
  shape?: string;
  width?: number;
  height?: number;
  imageUrl?: string;
  dblClickCB?: (n: Node, e: MouseEvent) => void;
  shapeStyle?: StylePropsT;
  labelStyle?: StylePropsT;
}
```
* `shape` : the id of the builtin or registered custom shape. (Default "rect")
* `width`/`height` : override heruistic to compute width/height with explict user specified width/height in pixels.
* `imageUrl` : if node type is "image", then this field has to be specified to indicate the url of the image source.
* `dbClickCB` : a callback function that is called when user double clicks on a node. The callback is provide the `Node` instance that was clicked and the double click event as parameters.
* `shapeStyle` : style override of default shape style (e.g. can specify color, fill, stroke, etc.)
* `labelStyle` : style override of node label style (e.g. font size, type, color, etc.)

## Built-in shapes
* `"rect"` : rectangle shape
* `"circle"` : circle shape
* `"diamond"` : diamond shape.  This usually renders slightly bigger than lable height/width to fit corners of diamond.


# Edge API
```typescript
new Edge(from, to, edge_options)
```
* `from`,`to` : the ids of the source/destination nodes.
* `edge_options`: determine what shape/style is used to render edge.  See below.

## Edge options
```typescript
interface EdgeOptions {
  markerStart?: string,
  markerEnd?: string,
  edgeStyle?: StylePropsT,
  markerStyle?: StylePropsT,
};
```
* `markerStart`/`markerEnd` : built-in or custom marker used for the edge source/destination node. Defaults to 'none'/'arrow' respectively.
* `edgeStyle` : style override of default edge style (e.g. can specify color, stroke, dash pattern, etc.)
* `markerStyle` : style override of node label style (e.g. font size, type, color, etc.)

## Built-in markers
* `"arrow"` : 
* `"circle"` : 
