import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";

import { AppContext } from "store/Store";
import { players, difficulty } from "data/settings";

import InfoModal from "components/modals/InfoModal";
import Nav from "components/common/Nav";
import ButtonGroup from "components/common/ButtonGroup";
import Button from "components/common/Button";
import ButtonLink from "components/common/ButtonLink";
import Toggle from "components/common/Toggle";

import styles from "./GameSettings.module.scss";

export default function GameSettings() {
  const {
    state: { settings },
    dispatch,
  } = useContext(AppContext);
  const history = useHistory();

  function handleGameStart() {
    dispatch({ type: "start" });

    history.push("/blade");
  }

  return (
    <div className={styles.settings}>
      <Nav />

      <div className={styles.config}>
        <h5 className={styles.configTitle}>Players</h5>

        <ButtonGroup
          values={players}
          selected={settings.players}
          update={(data) =>
            dispatch({ type: "update_settings", key: "players", data })
          }
        />
      </div>
      <div className={styles.config}>
        <h5 className={styles.configTitle}>Trick difficulty</h5>

        <ButtonGroup
          values={difficulty}
          selected={settings.difficulty}
          update={(data) =>
            dispatch({ type: "update_settings", key: "difficulty", data })
          }
        />
      </div>
      <div className={styles.toggle}>
        <div>
          <h5 className={styles.toggleTitle}>Exclude weird tricks?</h5>
          <p className={styles.toggleDescription}>
            <small>I’m looking at you stub soul.</small>
          </p>
        </div>

        <div className={styles.toggleInput}>
          <Toggle
            checked={settings.excludeWeird}
            update={(data) =>
              dispatch({ type: "update_settings", key: "excludeWeird", data })
            }
          />
        </div>
      </div>
      <div
        className={cn({
          [styles.toggle]: true,
          [styles.toggleDisabled]: settings.difficulty === 1,
        })}
      >
        <div>
          <h5 className={styles.toggleTitle}>Exclude negatives?</h5>
          <p className={styles.toggleDescription}>
            <small>
              {settings.difficulty === 1
                ? "Excluded by default on fresh difficulty."
                : "Triple XL or skinny jeans."}
            </small>
          </p>
        </div>

        <div className={styles.toggleInput}>
          <Toggle
            checked={
              settings.difficulty === 1 ? true : settings.excludeNegatives
            }
            update={(data) =>
              dispatch({
                type: "update_settings",
                key: "excludeNegatives",
                data,
              })
            }
          />
        </div>
      </div>
      <div className={styles.toggle}>
        <div>
          <h5 className={styles.toggleTitle}>Allow setter to pass?</h5>
          <p className={styles.toggleDescription}>
            <small>Turn passing off to push yourself!</small>
          </p>
        </div>

        <div className={styles.toggleInput}>
          <Toggle
            checked={settings.allowPassing}
            update={(data) =>
              dispatch({
                type: "update_settings",
                key: "allowPassing",
                data,
              })
            }
          />
        </div>
      </div>
      <div className={styles.action}>
        <Button onClick={handleGameStart}>Start Game</Button>

        <ButtonLink
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

      <InfoModal />
    </div>
  );
}
