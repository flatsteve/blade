import React from "react";

import styles from "./ButtonLink.module.scss";

export default function ButtonLink({ children, onClick, ...rest }) {
  return (
    <button className={styles.link} {...rest} onClick={onClick}>
      <small>{children}</small>
    </button>
  );
}
