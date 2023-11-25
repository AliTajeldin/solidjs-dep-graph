import { i as insert, c as createRenderEffect, a as c, b as className, t as template } from './index-36a0bc71.js';
import { N as Node, E as Edge, G as Graph } from './edge-3de3cc88.js';

const _tmpl$ = /*#__PURE__*/template(`<div style=margin:25px><div>An example of simplest graph.<br>Only two properties are required to be specified:<ul><li>nodes: array of Node objects</li><li>edges: array of Edge objects`);
function BasicExample() {
  const nodes = [new Node("1", "Node 1"), new Node("2", "Node 2"), new Node("3", "Node 3"), new Node("4", "Node 4"), new Node("5", "Node 5"), new Node("6", "Node 6")];
  const edges = [new Edge("1", "2"), new Edge("2", "3"), new Edge("2", "4"), new Edge("1", "5"), new Edge("1", "6")];
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

export { BasicExample as default };
