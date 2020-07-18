import React from "react";

import styles from "./Toggle.module.scss";

export default function TimeToggle({ checked, update }) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => update(!checked)}
      />

      <div className={styles.toggleSlider} />
      <small className={styles.toggleText}>On</small>
      <small className={styles.toggleText}>Off</small>
    </label>
  );
}
