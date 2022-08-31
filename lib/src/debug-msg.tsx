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
      <div style={{
        position: "fixed",
        "top": 0,
        "right": 0,
        "background-color": "yellow",
        "min-width": "100px",
        "min-height": "20px",
      }}>
        <p style="color: black; margin:0; padding:5px">
          {debugMsg()}
        </p>
      </div>
    </Portal>
  );
}

/**
 * should be called as handler for mousemove (e.g. <elem onmousemove={showMouseEvent})
 */
export const showMouseEvent: JSX.EventHandler<HTMLOrSVGElement, MouseEvent> = (e) => {
  if (!debugMsgRendered) {
    console.error("must render debug msg div first!");
  }
  setDebugMsg(`offset(${e.offsetX},${e.offsetY})`);
}
