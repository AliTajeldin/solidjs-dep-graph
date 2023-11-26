import { i as insert, c as createComponent, a as createRenderEffect, b as className, d as c, t as template } from './index-79b39d63.js';
import { N as Node, E as Edge, D as Description, G as Graph } from './description-d2756885.js';

const _tmpl$ = /*#__PURE__*/template(`<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<ul><li>nodes: array of Node objects</li><li>edges: array of Edge objects`),
  _tmpl$3 = /*#__PURE__*/template(`<div>`);
function BasicExample() {
  const description = ["An example of simplest graph.", _tmpl$(), "Only two properties are required to be specified:", _tmpl$2()];

  //--BEGIN
  const nodes = [new Node("1", "Node 1"), new Node("2", "Node 2"), new Node("3", "Node 3"), new Node("4", "Node 4"), new Node("5", "Node 5"), new Node("6", "Node 6")];
  const edges = [new Edge("1", "2"), new Edge("2", "3"), new Edge("2", "4"), new Edge("1", "5"), new Edge("1", "6")];
  const graph = new Graph(nodes, edges);
  return (() => {
    const _el$3 = _tmpl$3();
    insert(_el$3, () => graph.render(), null);
    insert(_el$3, createComponent(Description, {
      example: "basic",
      text: description
    }), null);
    createRenderEffect(() => className(_el$3, c.demoArea));
    return _el$3;
  })();
  //--END
}

export { BasicExample as default };
