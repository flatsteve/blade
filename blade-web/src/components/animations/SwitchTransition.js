import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function ({ transitionKey, children, styles }) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={transitionKey}
        timeout={300}
        classNames={{ ...styles }}
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
}
