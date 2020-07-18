import React, { useContext } from "react";

import { AppContext } from "store/Store";

import Modal from "components/modals/Modal";

export default function () {
  const {
    state: { ui },
    dispatch,
  } = useContext(AppContext);

  return (
    <Modal
      title="What is BLADE?"
      isOpen={ui.showInfoModal}
      handleClose={() =>
        dispatch({
          type: "set_show_modal",
          modalKey: "showInfoModal",
          data: false,
        })
      }
    >
      <h5>
        H.O.R.S.E on Skates{" "}
        <span role="img" aria-label="horse">
          🐎
        </span>
      </h5>

      <p>
        BLADE is an aggressive inline skating game where players take turns to
        set a trick which their opponent(s) must match.
      </p>

      <p>
        If a player fails to set the trick, the game progresses to the next
        player. Once a trick is set, all other players must attempt to land it
        or they get a letter.
      </p>

      <p>
        When a player has missed five set tricks, and spelt out the word BLADE,
        they are out.
      </p>

      <p>
        The winner is the last player standing{" "}
        <span role="img" aria-label="horse">
          🤘
        </span>
      </p>

      <p>
        <small>
          BLADE is developed by{" "}
          <a
            href="https://www.flatsteve.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            FLATSTEVE
          </a>{" "}
          and is completely free and open source. Give me a shout if you want to
          help or just say hello.
        </small>
      </p>
    </Modal>
  );
}
