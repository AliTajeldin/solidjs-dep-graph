import { i as insert, c as createComponent, a as createRenderEffect, b as className, d as c, t as template } from './index-53476d46.js';
import { N as Node, E as Edge, G as Graph, D as Description } from './description-fed82c74.js';

const _tmpl$ = /*#__PURE__*/template(`<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<div>`);
function StyleExample() {
  const description = ["Shape, label, and marker sytling can be overriden by user by specifying", _tmpl$(), "`shapeStyle`, `labelStyle`, and `markerStyle` properties respectively.", _tmpl$(), _tmpl$()];

  //--BEGIN
  const nodes = [Node("1", "Node 1", {
    shape: "circle",
    labelStyle: {
      stroke: "black"
    }
  }), Node("2", "Node 2", {
    shape: "diamond"
  }), Node("3", "Node 3", {
    shape: "rect"
  }), Node("4", "Node 4", {
    shapeStyle: {
      fill: "navy"
    },
    labelStyle: {
      stroke: "yellow"
    }
  })];
  const edges = [Edge("1", "2", {
    markerEnd: "circle"
  }), Edge("2", "3", {
    edgeStyle: {
      stroke: "red"
    },
    markerStyle: {
      stroke: "yellow",
      fill: "green"
    }
  }), Edge("2", "4", {
    markerEnd: "none"
  })];
  return (() => {
    const _el$4 = _tmpl$2();
    insert(_el$4, createComponent(Graph, {
      nodes: nodes,
      edges: edges
    }), null);
    insert(_el$4, createComponent(Description, {
      example: "style",
      text: description
    }), null);
    createRenderEffect(() => className(_el$4, c.demoArea));
    return _el$4;
  })();
  //--END
}

export { StyleExample as default };
