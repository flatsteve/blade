import React, { useContext, useEffect } from "react";
import cn from "classnames";

import { AppContext } from "store/Store";
import { NOTIFICATION_TIMEOUT } from "utils/constants";

import Transition from "components/animations/Transition";
import { ReactComponent as Cross } from "icons/cross.svg";

import styles from "./Notification.module.scss";

let timeoutId = null;

export default function () {
  const {
    state: {
      ui: { showNotification, notification },
    },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (notification.persist) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch({ type: "clear_notification" });
    }, NOTIFICATION_TIMEOUT);
  }, [showNotification, notification.persist, dispatch]);

  function clearNotification() {
    clearTimeout(timeoutId);
    dispatch({ type: "clear_notification" });
  }

  function reload() {
    dispatch({ type: "clear_notification" });
    window.location.reload();
  }

  return (
    <Transition inProp={showNotification} styles={styles}>
      <div
        className={cn({
          [styles.notification]: true,
          [styles.notificationWithAction]: notification.withAction,
        })}
      >
        <button className={styles.close} onClick={clearNotification}>
          <Cross className={styles.closeIcon} />
        </button>

        <div className={styles.content}>
          {notification.withAction && (
            <button className={styles.action} onClick={reload}>
              OK
            </button>
          )}

          <div className={styles.info}>
            <h4 className={styles.title}>{notification.title}</h4>

            <p className={styles.message}>
              <small>{notification.message}</small>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  );
}
