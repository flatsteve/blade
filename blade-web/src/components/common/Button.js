import React from "react";

import styles from "./Button.module.scss";

export default function Button({ children, onClick, ...rest }) {
  return (
    <button className={styles.button} {...rest} onClick={onClick}>
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
}
