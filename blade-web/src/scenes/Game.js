import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "store/Store";

import ScoreBoard from "components/ScoreBoard";
import TrickInfo from "components/TrickInfo";
import TrickActions from "components/TrickActions";
import WinnerBoard from "components/WinnerBoard";

import styles from "./Game.module.scss";

export default function Game() {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  function handleGameQuit() {
    dispatch({ type: "quit" });
    history.push("/");
  }

  useEffect(() => {
    // Protect against going forward or back to a game
    // When it has not started (e.g. after you just quit)
    if (!state.gameStarted) {
      dispatch({ type: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // Clear game state if user presses back
      // TODO consider allowing resume if this happens
      if (history.action === "POP") {
        dispatch({ type: "quit" });
      }
    };
  }, [history, dispatch]);

  if (state.gameStarted) {
    return (
      <div className={styles.game}>
        <ScoreBoard game={state} />

        <TrickInfo game={state} />

        <TrickActions
          handleTrickLanded={() => dispatch({ type: "landed" })}
          handleTrickMissed={() => dispatch({ type: "missed" })}
          handlePassTrick={() => dispatch({ type: "pass" })}
          allowPassing={state.settings.allowPassing}
          playerMustMatch={state.trickSetBy}
        />

        <button className={styles.quit} onClick={handleGameQuit}>
          Quit Game
        </button>

        <WinnerBoard
          game={state}
          handleBackToSetup={handleGameQuit}
          handleResetGame={() => dispatch({ type: "reset_game" })}
        />
      </div>
    );
  }

  return null;
}
