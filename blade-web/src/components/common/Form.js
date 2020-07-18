import React from "react";

import styles from "./Form.module.scss";

export function Label({ id, children }) {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
    </label>
  );
}

export function Input({ id, value, placeholder, onChange }) {
  return (
    <input
      id={id}
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event)}
    />
  );
}
