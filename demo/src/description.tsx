import { Component, JSXElement } from "solid-js";
import { Code } from './code';
import c from './style.module.css';


export const Description: Component<{ example: string, text:JSXElement }> = (props) => {
  return (
    <div class={c.demoDescription}>
      {props.text}
      <Code example={props.example} />
    </div>
  );
}
