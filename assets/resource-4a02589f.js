import { f as createResource, i as insert, c as createComponent, S as Show, a as createRenderEffect, b as className, d as c, t as template } from './index-fdf6e1fc.js';
import { D as Description, N as Node, E as Edge, G as Graph } from './description-d9a12e5f.js';

const _tmpl$ = /*#__PURE__*/template(`<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<div>`),
  _tmpl$3 = /*#__PURE__*/template(`<p>Loading...`);
const description = ["An example of graph info being loaded as a resource.", _tmpl$(), "an explicit 1 sec delay is added to the fetch to simulate", _tmpl$(), "a real fetch operation.", _tmpl$(), _tmpl$()];

//--BEGIN
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
    const _el$5 = _tmpl$2();
    insert(_el$5, createComponent(Show, {
      get when() {
        return graph.state === "ready";
      },
      get fallback() {
        return _tmpl$3();
      },
      get children() {
        return graph().render();
      }
    }), null);
    insert(_el$5, createComponent(Description, {
      example: "resource",
      text: description
    }), null);
    createRenderEffect(() => className(_el$5, c.demoArea));
    return _el$5;
  })();
}
//--END

export { ResourceExample as default };
