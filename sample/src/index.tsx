/* @refresh reload */
import { render } from 'solid-js/web';
import { Node, Edge, Graph } from "solidjs-dep-graph";

const App = () => {
  const nodes = [Node("N1"), Node("N2"), Node("N3")];
  const edges = [Edge("N1", "N2"), Edge("N1", "N3")];

  return (
    <Graph nodes={nodes} edges={edges} />
  );
}


render(() => (<App />),
  document.getElementById('root') as HTMLElement);
