import { c as createRenderEffect, s as setAttribute, d as style, t as template, i as insert, a as c, b as className } from './index-16829732.js';
import { s as shapeStyle, S as Shapes, F as Factory, N as Node, c as colors, E as Edge, G as Graph, m as markerStyle } from './edge-b6fb13c8.js';

const _tmpl$$1 = /*#__PURE__*/template(`<svg><path></svg>`, false, true);

/**
 * Base shape for SVG path based shapes.
 * Users only need to override the `path` method to provide the SVG path string.
 */
class PathShape {
  path(width, height) {
    throw new Error("must implement path() method!");
  }
  render(width, height, style$1) {
    const _self$ = this;
    return (() => {
      const _el$ = _tmpl$$1();
      createRenderEffect(_p$ => {
        const _v$ = _self$.path(width, height),
          _v$2 = {
            ...shapeStyle,
            ...style$1
          };
        _v$ !== _p$._v$ && setAttribute(_el$, "d", _p$._v$ = _v$);
        _p$._v$2 = style(_el$, _v$2, _p$._v$2);
        return _p$;
      }, {
        _v$: undefined,
        _v$2: undefined
      });
      return _el$;
    })();
  }
  shapeInfo(width, height) {
    return Shapes.path(this.path(width, height));
  }
}

const _tmpl$ = /*#__PURE__*/template(`<svg><marker viewBox="0 0 10 10"refX=9 refY=5 markerUnits=strokeWidth markerWidth=7 markerHeight=7 orient=auto-start-reverse><path d="M 10 0 L 10 10 L 0 5 z"></svg>`, false, true),
  _tmpl$2 = /*#__PURE__*/template(`<div style=margin:25px;flex-grow:1><div>This example demonstrates various ways graph can be customized.<ul><li>Custom shapes and markers can be used by simply registering them with the <code>Factory</code></li><li>User styles can still be applied over custom shapes/markers</li><li>Nodes 1 and 3 also have a double click callback attached to them</li><li>the node width/height can be explicitly specified to change size of node</li><li><code>svgStyle</code> can be set on graph to affect style of entire graph (e.g. expand to fill screen as shown here)`);

/**
 * For custom path shapes, we only need to implement the `path` method.
 */
class HouseShape extends PathShape {
  path(width, height) {
    const xoff = width / 2;
    const yoff = height / 2;
    return `M -${xoff} ${yoff} L -${xoff} -${yoff / 2} L 0 -${yoff} L ${xoff} -${yoff / 2} L ${xoff} ${yoff} z`;
  }
}
function BigRevArrowMarker(props) {
  return (() => {
    const _el$ = _tmpl$(),
      _el$2 = _el$.firstChild;
    createRenderEffect(_p$ => {
      const _v$ = props.id,
        _v$2 = {
          ...markerStyle,
          ...props.markerStyle
        };
      _v$ !== _p$._v$ && setAttribute(_el$, "id", _p$._v$ = _v$);
      _p$._v$2 = style(_el$2, _v$2, _p$._v$2);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined
    });
    return _el$;
  })();
}
function CustomExample() {
  Factory.registerShape("house", new HouseShape());
  Factory.registerMarker("big-rev-arrow", BigRevArrowMarker);
  const cb = n => {
    console.log("Double click:", n.id);
  };
  const nodes = [new Node("1", "", {
    shape: "image",
    imageUrl: "/linux.png",
    height: 30,
    width: 30,
    dblClickCB: cb
  }), new Node("2", "Node 2", {
    shape: "house",
    shapeStyle: {
      fill: colors.blue2
    }
  }), new Node("3", "Node 3", {
    dblClickCB: cb
  }), new Node("4", "Node 4", {
    width: 100,
    height: 50,
    shape: "house"
  })];
  const edges = [new Edge("1", "2", {
    markerEnd: "circle"
  }), new Edge("2", "3", {
    markerStart: "circle",
    markerEnd: "big-rev-arrow",
    markerStyle: {
      stroke: "yellow",
      fill: "green"
    }
  }), new Edge("2", "4")];
  const graph = new Graph(nodes, edges).setLayoutOptions({
    rankdir: "TB"
  }).setSvgStyle({
    height: "100%"
  });
  return (() => {
    const _el$3 = _tmpl$2(),
      _el$4 = _el$3.firstChild;
    insert(_el$3, () => graph.render(), _el$4);
    createRenderEffect(_p$ => {
      const _v$3 = c.demoArea,
        _v$4 = c.demoDescription;
      _v$3 !== _p$._v$3 && className(_el$3, _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && className(_el$4, _p$._v$4 = _v$4);
      return _p$;
    }, {
      _v$3: undefined,
      _v$4: undefined
    });
    return _el$3;
  })();
}

export { BigRevArrowMarker, CustomExample as default };
