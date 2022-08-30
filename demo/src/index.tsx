/* @refresh reload */
import { render } from 'solid-js/web';
import Basic from './basic';
import c from './style.module.css';

export const App = () => {
  return <main class={c.mainContainer}>
    <Basic />
  </main>
}

render(() => <App />, document.getElementById('root') as HTMLElement);
