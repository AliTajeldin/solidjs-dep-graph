/* @refresh reload */
import { Router, useRoutes, Link } from "@solidjs/router";
import { routes } from './routes';
import { render } from 'solid-js/web';
import Nav from './nav';
import c from './style.module.css';

export const App = () => {
  const Routes = useRoutes(routes);
  return <main class={c.mainContainer}>
    <Nav />
    <Routes />
  </main>
}

render(() => (
  <Router base="solidjs-dep-graph">
    <App />
  </Router>),
  document.getElementById('root') as HTMLElement);
