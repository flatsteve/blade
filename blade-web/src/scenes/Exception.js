import React from "react";

import Button from "components/common/Button";

import { ReactComponent as LogoFull } from "icons/logo-full.svg";

import styles from "./Exception.module.scss";

export default function () {
  function handleReload() {
    window.location.href = "/";
  }

  return (
    <div className={styles.exception}>
      <LogoFull className={styles.logo} />

      <div className={styles.content}>
        <h4 className={styles.title}>DOH!</h4>

        <p>
          Sorry! Something that totally wasn't supposed to happen, happened. The
          error has been recorded.
        </p>

        <p>
          <small>
            Sometimes just turning it off and on works. Hit reload to refresh
            the app.
          </small>
        </p>
      </div>

      <div className={styles.action}>
        <Button onClick={handleReload}>Reload</Button>
      </div>
    </div>
  );
}
