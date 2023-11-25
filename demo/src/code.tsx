import { createResource, createSignal, Show } from "solid-js";
import c from './style.module.css';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/night-owl.min.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

async function fetchCode(example: string): Promise<string> {
  console.log("fetching code!");

  const response = await fetch(`/solidjs-dep-graph/examples/${example}.tsx`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawCode = await response.text();

  const htmlCode = hljs.highlight(rawCode, {
    language: 'typescript',
    // ignoreIllegals: false,
  }).value;

  return htmlCode;
}

interface CodeProps {
  example: string;
}

const HtmlCode = (props: CodeProps) => {
  const [htmlCode] = createResource("basic", fetchCode);

  return (
    <Show when={htmlCode.state === "ready"} fallback={<p>Loading...</p>}>
      <pre>
        <code innerHTML={htmlCode()} />
      </pre>
    </Show>
  );
}

export const Code = (props: CodeProps) => {
  const [showCode, setShowCode] = createSignal(false);
  const buttonLabel = () => {
    return showCode() ? "Hide Code" : "Show Code";
  }

  return (
    <>
      <button class={c.navLink} onClick={() => setShowCode(c=>!c)}>{buttonLabel()}</button>
      <Show when={showCode()}>
        <HtmlCode example={props.example}/>
      </Show>
    </>
  )
}
