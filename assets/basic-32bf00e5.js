import { i as insert, c as createComponent, a as createRenderEffect, b as className, d as c, t as template } from './index-53476d46.js';
import { N as Node, E as Edge, G as Graph, D as Description } from './description-fed82c74.js';

const _tmpl$ = /*#__PURE__*/template(`<br>`),
  _tmpl$2 = /*#__PURE__*/template(`<ul><li>nodes: array of Node objects</li><li>edges: array of Edge objects`),
  _tmpl$3 = /*#__PURE__*/template(`<div>`);
function BasicExample() {
  const description = ["An example of simplest graph.", _tmpl$(), "Only two properties are required to be specified:", _tmpl$2()];

  //--BEGIN
  const nodes = [Node("N1"), Node("N2"), Node("N3"), Node("N4"), Node("N5"), Node("N6")];
  const edges = [Edge("N1", "N2"), Edge("N2", "N3"), Edge("N2", "N4"), Edge("N1", "N5"), Edge("N1", "N6")];
  return (() => {
    const _el$3 = _tmpl$3();
    insert(_el$3, createComponent(Graph, {
      nodes: nodes,
      edges: edges
    }), null);
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
