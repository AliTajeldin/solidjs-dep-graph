import { createSignal, JSX, JSXElement } from "solid-js";
import { Portal } from "solid-js/web";

// FIXME: rewrite using use: directive (https://www.solidjs.com/tutorial/bindings_directives)
/**
 * Show a debug message in the upper right corner.
 * Very handy for debugging events.  Couple of ways to use this:
 * 1. call `setDebugMsg()` with the error message.
 * 2. use `watchMouseMove(domElement) to watch mouse movements on a DOM element
 * In both cases you must call `renderDebugMsg` once somewhere in your render tree.
 */
export const [debugMsg, setDebugMsg] = createSignal("");

let debugMsgRendered = false;

export function renderDebugMsg() {
  debugMsgRendered = true;
  return (
    <Portal>
    <div class="fixed top-0 right-0 text-cyan-300 bg-black pr-1 pt-1 min-w-[100px] min-h-[25px]">
      <p>{debugMsg()}</p>
    </div>
    </Portal>
  );
}

/**
 * should be called as handler for mousemove (e.g. <elem onmousemove={showMouseEvent})
 */
export const showMouseEvent : JSX.EventHandler<HTMLOrSVGElement, MouseEvent> = (e) => {
  if (!debugMsgRendered) {
    console.error("must render debug msg div first!");
  }
  setDebugMsg(`offset(${e.offsetX},${e.offsetY})`);
}
