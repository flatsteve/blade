import React from "react";
import cn from "classnames";

import styles from "./ButtonGroup.module.scss";

export default function ButtonGroup({ values, update, selected }) {
  const selectedItem = values.find((v) => v.value === selected);

  return (
    <>
      <div className={styles.buttonGroup}>
        {values.map((item) => {
          return (
            <button
              key={item.value}
              onClick={() => update(item.value)}
              className={cn({
                [styles.buttonGroupButton]: true,
                [styles.buttonGroupButtonSelected]: item.value === selected,
              })}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className={styles.info}>
        <small>({selectedItem.info})</small>
      </p>
    </>
  );
}
