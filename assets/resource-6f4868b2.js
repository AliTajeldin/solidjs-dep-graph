import { f as createResource, i as insert, c as createComponent, S as Show, a as createRenderEffect, b as className, d as c, t as template } from './index-53476d46.js';
import { G as Graph, D as Description, N as Node, E as Edge } from './description-fed82c74.js';

const _tmpl$ = /*#__PURE__*/template(`<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<div>`),
  _tmpl$3 = /*#__PURE__*/template(`<p>Loading...`);
const description = ["An example of graph info being loaded as a resource.", _tmpl$(), "an explicit 1 sec delay is added to the fetch to simulate", _tmpl$(), "a real fetch operation.", _tmpl$(), _tmpl$()];

//--BEGIN
async function fetchGraphInfo() {
  const nodes = [Node("1", "Node 1"), Node("2", "Node 2"), Node("3", "Node 3")];
  const edges = [Edge("1", "2"), Edge("1", "3")];

  // simulate a slight delay
  await new Promise(r => setTimeout(r, 1000));
  return {
    nodes,
    edges
  };
}
function ResourceExample() {
  const [graphInfo] = createResource(fetchGraphInfo);
  return (() => {
    const _el$5 = _tmpl$2();
    insert(_el$5, createComponent(Show, {
      get when() {
        return graphInfo.state === "ready";
      },
      get fallback() {
        return _tmpl$3();
      },
      get children() {
        return createComponent(Graph, {
          get nodes() {
            return graphInfo().nodes;
          },
          get edges() {
            return graphInfo().edges;
          }
        });
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
