import { i as insert, c as createRenderEffect, a as c, b as className, t as template } from './index-16829732.js';
import { N as Node, E as Edge, G as Graph } from './edge-b6fb13c8.js';

const _tmpl$ = /*#__PURE__*/template(`<div style=margin:25px><div>Shape, label, and marker sytling can be overriden by user by specifying<br>\`shapeStyle\`, \`labelStyle\`, and \`markerStyle\` properties respectively.`);
function StyleExample() {
  const nodes = [new Node("1", "Node 1", {
    shape: "circle",
    labelStyle: {
      stroke: "black"
    }
  }), new Node("2", "Node 2", {
    shape: "diamond"
  }), new Node("3", "Node 3", {
    shape: "rect"
  }), new Node("4", "Node 4", {
    shapeStyle: {
      fill: "navy"
    },
    labelStyle: {
      stroke: "yellow"
    }
  })];
  const edges = [new Edge("1", "2", {
    markerEnd: "circle"
  }), new Edge("2", "3", {
    edgeStyle: {
      stroke: "red"
    },
    markerStyle: {
      stroke: "yellow",
      fill: "green"
    }
  }), new Edge("2", "4", {
    markerEnd: "none"
  })];
  const graph = new Graph(nodes, edges);
  return (() => {
    const _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    insert(_el$, () => graph.render(), _el$2);
    createRenderEffect(_p$ => {
      const _v$ = c.demoArea,
        _v$2 = c.demoDescription;
      _v$ !== _p$._v$ && className(_el$, _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && className(_el$2, _p$._v$2 = _v$2);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}

export { StyleExample as default };
