import React from "react";
import { useLocation, Link } from "react-router-dom";

import { ReactComponent as Back } from "icons/back.svg";
import { ReactComponent as Settings } from "icons/settings.svg";
import { ReactComponent as Logo } from "icons/logo.svg";

import styles from "./Nav.module.scss";

export default function () {
  const { pathname } = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.icon}>
        {pathname === "/" ? (
          <Link to="/settings">
            <Settings />
          </Link>
        ) : (
          <Link to="/">
            <Back />
          </Link>
        )}
      </div>

      <Logo className={styles.logo} />

      <div className={styles.navSpacer} />
    </div>
  );
}
