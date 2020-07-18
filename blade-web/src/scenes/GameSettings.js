import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";

import { AppContext } from "store/Store";
import { players, difficulty } from "data/settings";
import { getArrayFromNum } from "utils/utils";

import InfoModal from "components/modals/InfoModal";
import Nav from "components/common/Nav";
import ButtonGroup from "components/common/ButtonGroup";
import Button from "components/common/Button";
import ButtonLink from "components/common/ButtonLink";
import Toggle from "components/common/Toggle";
import ExpandButton from "components/common/ExpandButton";
import { Label, Input } from "components/common/Form";

import styles from "./GameSettings.module.scss";

export default function GameSettings() {
  const {
    state: { settings },
    dispatch,
  } = useContext(AppContext);
  const history = useHistory();
  const [showPlayerNames, setShowPlayerNames] = useState(false);
  const [names, updateNames] = useState(settings.playerNames);

  function setPlayerName({ playerNumber, name }) {
    const updatedNames = { ...names, [playerNumber]: name };

    updateNames(updatedNames);
  }

  function handleGameStart() {
    if (Object.keys(names).length) {
      dispatch({
        type: "set_player_names",
        names,
      });
    }

    dispatch({ type: "start" });

    history.push("/blade");
  }

  return (
    <div className={styles.settings}>
      <Nav />

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

      {settings.players > 1 && (
        <div className={styles.playerToggle}>
          <ExpandButton
            isOpen={showPlayerNames}
            onClick={() => setShowPlayerNames(!showPlayerNames)}
          >
            {showPlayerNames ? (
              <span>Hide other player names</span>
            ) : (
              <span>
                Add other player names <small>(optional)</small>
              </span>
            )}
          </ExpandButton>

          {showPlayerNames && (
            <div className={styles.playerInputs}>
              {getArrayFromNum(settings.players - 1).map((number) => {
                const playerNumber = number + 1;

                return (
                  <div className={styles.formGroup} key={number}>
                    <Label id={playerNumber}>Player {playerNumber} name</Label>

                    <Input
                      id={playerNumber}
                      value={names[playerNumber]}
                      placeholder={`Player ${playerNumber}`}
                      onChange={(event) =>
                        setPlayerName({
                          playerNumber,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

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
