import { e as createResource, i as insert, f as createComponent, S as Show, c as createRenderEffect, a as c, b as className, t as template } from './index-0f4e8857.js';
import { N as Node, E as Edge, G as Graph } from './edge-15b6c646.js';

const _tmpl$ = /*#__PURE__*/template(`<div style=margin:25px><div>An example of graph info being loaded as a resource.<br>an explicit 1 sec delay is added to the fetch to simulate<br>a real fetch operation.<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<p>Loading...`);
async function fetchGraphInfo() {
  const nodes = [new Node("1", "Node 1"), new Node("2", "Node 2"), new Node("3", "Node 3")];
  const edges = [new Edge("1", "2"), new Edge("1", "3")];

  // simulate a slight delay
  await new Promise(r => setTimeout(r, 1000));
  return new Graph(nodes, edges);
}
function ResourceExample() {
  const [graph] = createResource(fetchGraphInfo);
  return (() => {
    const _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    insert(_el$, createComponent(Show, {
      get when() {
        return graph.state === "ready";
      },
      get fallback() {
        return _tmpl$2();
      },
      get children() {
        return graph().render();
      }
    }), _el$2);
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

export { ResourceExample as default };
