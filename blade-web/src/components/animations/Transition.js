import React from "react";
import { CSSTransition } from "react-transition-group";

export default function ({ inProp, timeout = 200, children, styles }) {
  return (
    <CSSTransition
      in={Boolean(inProp)}
      timeout={timeout}
      unmountOnExit
      classNames={{ ...styles }}
    >
      {children}
    </CSSTransition>
  );
}
