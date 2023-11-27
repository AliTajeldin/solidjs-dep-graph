!!! Work In Progress !!!

# solidjs-dep-graph

SolidJS component for rendering a dependency graph layout using Dagre layout

[Examples Demo](https://alitajeldin.github.io/solidjs-dep-graph/)

# Getting started

Install solidjs-dep-graph using npm, pnpm, or yarn.

```
# npm
npm install solidjs-dep-graph --save
# pnpm
pnpm add solidjs-dep-graph
# yarn
yarn add solidjs-dep-graph
```

# Sample App
A sample application is provided for a quick start:
```bash
npx degit alitajeldin/solidjs-dep-graph/sample sample
cd sample
npm install
npm run dev
```

# Basic usage

Graph component needs to be provided a set of Nodes and Edges at a minimum.
```typescript
import { Node, Edge, Graph } from "solidjs-dep-graph";
function App() {
  const nodes = [
    Node("1", "Node 1"),
    Node("2", "Node 2"),
    Node("3", "Node 3"),
    Node("4", "Node 4"),
    Node("5", "Node 5"),
    Node("6", "Node 6"),
  ];
  const edges = [
    Edge("1", "2",),
    Edge("2", "3",),
    Edge("2", "4"),
    Edge("1", "5"),
    Edge("1", "6",),
  ];

  return <Graph nodes={nodes} edges={edges}/>
}
```
The above would produce the following graph.

![Basic Example Image](./docs/img/basic_example.png)

# Styling and Custom Shapes / Markers
solidjs-dep-graph allows for easy styling of nodes, edges and labels.
A simple css style object can be attached to any node/edge.
See [style example code](https://github.com/AliTajeldin/solidjs-dep-graph/blob/master/demo/src/examples/style.tsx)

solidjs-dep-graph also allows user to provide custom shapes and markers.

![Custom Example Image](./docs/img/custom_example.png)

See [Customization](./docs/custom.md) documentation for details and
[customization example code](https://github.com/AliTajeldin/solidjs-dep-graph/blob/master/demo/src/examples/custom.tsx)


# Documentation
* [API Documentation](./docs/api.md)

# CREDIT
Many of the ideas here (especially the intersect code) came from [dagre-reactjs](https://github.com/bobthekingofegypt/dagre-reactjs).
