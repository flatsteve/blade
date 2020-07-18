import React, { useState, useContext } from "react";

import { AppContext } from "store/Store";

import InfoModal from "components/modals/InfoModal";
import Button from "components/common/Button";
import ButtonLink from "components/common/ButtonLink";

import { ReactComponent as LogoFull } from "icons/logo-full.svg";

import styles from "./Setup.module.scss";

export default function () {
  const { dispatch } = useContext(AppContext);
  let [name, updateName] = useState("");

  function handleSubmit() {
    if (!name) {
      name = "Player 1";
    }

    dispatch({
      type: "show_notification",
      notification: {
        title: "Lets Roll...",
        message: `Go hard or go home, ${name}.`,
      },
    });

    dispatch({
      type: "set_player_names",
      names: { 1: name },
    });
  }

  return (
    <div className={styles.setup}>
      <LogoFull className={styles.logo} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Enter Your Name <small>(optional)</small>
          </label>

          <input
            className={styles.input}
            value={name}
            placeholder="Player 1"
            onChange={(event) => updateName(event.target.value)}
          />
        </div>

        <div className={styles.action}>
          <Button type="submit">Continue</Button>

          <ButtonLink
            type="button"
            onClick={() =>
              dispatch({
                type: "set_show_modal",
                modalKey: "showInfoModal",
                data: true,
              })
            }
          >
            What the heck is BLADE?
          </ButtonLink>
        </div>
      </form>

      <InfoModal />
    </div>
  );
}
