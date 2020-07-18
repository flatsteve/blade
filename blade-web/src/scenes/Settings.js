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
  let [name, updateName] = useState(settings.playerName);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      name = "Player 1";
    }

    if (name === settings.playerName) {
      return history.push("/");
    }

    dispatch({
      type: "set_player_name",
      name,
    });

    history.push("/");
  }

  return (
    <div className={styles.setup}>
      <Nav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Label id="name">Your name</Label>

          <Input
            id="name"
            value={name}
            placeholder="Player 1"
            onChange={(event) => updateName(event.target.value)}
          />
        </div>

        <div className={styles.topScore}>
          <p>Your top single player score</p>

          <h4>
            {settings.topScore ? settings.topScore : "No top score yet..."}
          </h4>
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
