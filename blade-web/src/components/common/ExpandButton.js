import React from "react";
import cn from "classnames";

import styles from "./ExpandButton.module.scss";

export default function ({ children, isOpen, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}

      <div
        className={cn({
          [styles.circlePlus]: true,
          [styles.closed]: !isOpen,
          [styles.opened]: isOpen,
        })}
      >
        <div className={styles.circle}>
          <div className={styles.horizontal}></div>
          <div className={styles.vertical}></div>
        </div>
      </div>
    </button>
  );
}
