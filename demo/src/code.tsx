import { createResource, Show } from "solid-js";
// import hljs from 'highlight.js';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript'; 
import xml from 'highlight.js/lib/languages/xml'; 
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

async function fetchCode(example: string): Promise<string> {
  console.log("fetching code!");

  const response = await fetch(`/solidjs-dep-graph/${example}.tsx`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const rawCode = await response.text();

  const htmlCode = hljs.highlight(rawCode, {
    language: 'typescript',
    // ignoreIllegals: false,
  }).value;

  // console.log("html:", htmlCode);

  return htmlCode;
}

interface CodeProps {
  example: string;
}

export const Code = (props: CodeProps) => {
  const [htmlCode] = createResource("basic", fetchCode);

  return (
    <Show when={htmlCode.state === "ready"} fallback={<p>Loading...</p>}>
      <pre>
        <code
          innerHTML={htmlCode()}
        />
      </pre>
    </Show>
  );
}