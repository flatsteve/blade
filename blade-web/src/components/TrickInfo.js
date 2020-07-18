import React, { useContext } from "react";

import { AppContext } from "store/Store";

import SwitchTransition from "components/animations/SwitchTransition";
import Modal from "components/modals/Modal";
import TrickImage from "components/TrickImage";
import { MAX_TRICK_NAME_LEN } from "utils/constants";

import styles from "./TrickInfo.module.scss";

export default function TrickInfo({ game }) {
  const {
    state: { ui },
    dispatch,
  } = useContext(AppContext);

  const trickNameLength = game.trick.name.length;

  function setShowModal(modalKey, show) {
    dispatch({
      type: "set_show_modal",
      modalKey,
      data: show,
    });
  }

  function renderModalFooter() {
    return (
      <small>
        If you don't agree with my description/naming, sorry. Just have fun and
        maybe email me something better{" "}
        <span role="img" aria-label="horse">
          👍
        </span>
      </small>
    );
  }

  return (
    <div className={styles.trick}>
      <TrickImage
        trick={game.trick}
        nextTrick={game.nextTrick}
        handleShowMissingImageModal={() =>
          setShowModal("showMissingImageModal", true)
        }
        handleClickTrickImage={() => setShowModal("showTrickModal", true)}
      />

      <p className={styles.trickContext}>
        <small>
          <span className={styles.trickContextName}>
            {game.players[game.activePlayer].name}{" "}
          </span>
          {game.players[game.activePlayer].hasHadFinalAttempt ? (
            <span>final attempt</span>
          ) : (
            <span>
              {game.isSinglePlayer ? (
                <span>to land</span>
              ) : (
                <span>{game.trickSetBy ? "to match" : "to set"}</span>
              )}
            </span>
          )}
          ...
        </small>
      </p>

      <div
        className={styles.trickNameContainer}
        onClick={() => setShowModal("showTrickModal", true)}
      >
        <SwitchTransition transitionKey={game.trick.id} styles={styles}>
          {trickNameLength <= MAX_TRICK_NAME_LEN ? (
            <h2 className={styles.trickName}>{game.trick.name}</h2>
          ) : (
            <h3 className={styles.trickName}>{game.trick.name}</h3>
          )}
        </SwitchTransition>
      </div>

      <Modal
        title={game.trick.name}
        isOpen={ui.showTrickModal}
        contentFooter={renderModalFooter()}
        handleClose={() => setShowModal("showTrickModal", false)}
      >
        <>
          {Object.entries(game.trick.description).map(
            ([name, description], index) => {
              return (
                <p key={index}>
                  <span className={styles.descriptionName}>{name}</span>:{" "}
                  {description || "No description available yet, sorry."}
                </p>
              );
            }
          )}
        </>
      </Modal>

      <Modal
        title="Helping with images"
        isOpen={ui.showMissingImageModal}
        handleClose={() => setShowModal("showMissingImageModal", false)}
      >
        <p>
          Yo! Firstly, cheers for checking this out, much appreciated{" "}
          <span role="img" aria-label="hands">
            🙌
          </span>
        </p>

        <p>
          If you have any high-quality images of inline skating grinds I could
          feature in BLADE please email me at{" "}
          <a href="mailto:info@flatsteve.com">info@flatsteve.com</a>.
        </p>

        <p>
          The reason you are seeing these empty images is that I don't want to
          rip-off anyone's work. Any images you do see are either my own or
          obtained with the photographer's permission. Any featured images would
          be properly attributed and linked.
        </p>

        <p>
          Peace out{" "}
          <span role="img" aria-label="peace">
            ✌️
          </span>
        </p>
      </Modal>
    </div>
  );
}
