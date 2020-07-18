import React from "react";

import styles from "./TrickActions.module.scss";

import { ReactComponent as Tick } from "icons/tick.svg";
import { ReactComponent as Cross } from "icons/cross.svg";
import { ReactComponent as Refresh } from "icons/refresh.svg";

export default function TrickActions({
  handleTrickMissed,
  handleTrickLanded,
  handlePassTrick,
  playerMustMatch,
  allowPassing,
}) {
  return (
    <div className={styles.actions}>
      <div className={styles.actionsContainer}>
        <div className={styles.action}>
          <button className={styles.actionButton} onClick={handleTrickMissed}>
            <Cross />
          </button>

          <p className={styles.actionButtonText}>
            <small>Missed</small>
          </p>
        </div>

        {allowPassing && (
          <div className={styles.action}>
            <button
              className={`${styles.actionButton} ${styles.actionButtonSmall}`}
              disabled={playerMustMatch}
              onClick={handlePassTrick}
            >
              <Refresh />
            </button>

            <p className={styles.actionButtonText}>
              <small>Pass</small>
            </p>
          </div>
        )}

        <div className={styles.action}>
          <button className={styles.actionButton} onClick={handleTrickLanded}>
            <Tick />
          </button>

          <p className={styles.actionButtonText}>
            <small>{playerMustMatch ? "Matched" : "Landed"}</small>
          </p>
        </div>
      </div>
    </div>
  );
}
