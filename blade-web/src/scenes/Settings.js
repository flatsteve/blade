import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AppContext } from "store/Store";

import Nav from "components/common/Nav";
import Button from "components/common/Button";
import { Label, Input } from "components/common/Form";

import styles from "./Settings.module.scss";

export default function () {
  const {
    state: { settings },
    dispatch,
  } = useContext(AppContext);
  const history = useHistory();
  let [name, updateName] = useState(settings.playerNames[1]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      name = "Player 1";
    }

    if (name === settings.playerNames[1]) {
      return history.push("/");
    }

    dispatch({
      type: "show_notification",
      notification: {
        title: "Name Updated",
        message: `Go hard or go home, ${name}.`,
      },
    });

    dispatch({
      type: "set_player_names",
      names: { 1: name },
    });

    history.push("/");
  }

  return (
    <div className={styles.setup}>
      <Nav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Label id="name">Your Name</Label>

          <Input
            id="name"
            value={name}
            placeholder="Player 1"
            onChange={(event) => updateName(event.target.value)}
          />
        </div>

        <div className={styles.topScore}>
          <p>
            Your Top Score <small>(single player)</small>
          </p>

          {settings.topScore ? (
            <h4 className={styles.scoreCount}>{settings.topScore}</h4>
          ) : (
            <p>
              <small>
                No top score yet, land some tricks in single player...
              </small>
            </p>
          )}
        </div>

        <div className={styles.action}>
          <Button type="submit">Save Changes</Button>

          <Link to="/" className={styles.cancel}>
            <small>Cancel</small>
          </Link>
        </div>
      </form>
    </div>
  );
}
