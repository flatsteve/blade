import produce from "immer";

import initialState from "store/initialState";
import {
  populateInitialPlayerState,
  getNextActivePlayer,
  isGameOver,
  isSinglePlayer,
} from "utils/utils";
import TrickGenerator from "utils/TrickGenerator";
import { FINAL_LETTER, MAX_DIFFICULTY } from "utils/constants";
import track from "utils/analytics";

let Tricks;
let trickHash = {};

function getNewTrick(state) {
  // Dev only
  if (!Tricks) {
    Tricks = new TrickGenerator({});
  }

  const trick = Tricks.generateTrick();

  // Check if trick has already been attempted in game
  if (trickHash[trick.id]) {
    // If the max combination of tricks has been done then add tricks from higher difficulty
    if (Object.keys(trickHash).length === Tricks.maxCombinations) {
      const difficulty = state.settings.difficulty;

      // If already on highest difficulty then nothing to do but start again
      if (difficulty === MAX_DIFFICULTY) {
        trickHash = {};

        state.ui.notification = {
          title: "Legendary!",
          message: "You broke the game. Resetting tricks.",
        };
      } else {
        // If not then bump up the difficulty
        state.settings.difficulty = difficulty + 1;

        Tricks = new TrickGenerator({
          ...state.settings,
          difficulty: difficulty + 1,
        });

        state.ui.notification = {
          title: "Too Good!",
          message: "Bumping difficulty to the next level.",
        };
      }

      state.ui.showNotification = true;
    }

    return getNewTrick(state);
  }

  trickHash[trick.id] = trick.name;
  return trick;
}

function resetIfBackToSetter(nextActivePlayerNo, newState) {
  // If next player is the setter then reset and show a new trick
  if (nextActivePlayerNo === newState.trickSetBy) {
    newState.trickSetBy = null;
    setTricks(newState);
  }

  return newState;
}

function setTricks(newState) {
  if (newState.nextTrick) {
    newState.trick = newState.nextTrick;
  } else {
    newState.trick = getNewTrick(newState);
  }

  newState.nextTrick = getNewTrick(newState);

  return newState;
}

export default produce((newState, action) => {
  switch (action.type) {
    case "update_settings":
      newState.settings[action.key] = action.data;
      break;

    case "set_player_name":
      let title;

      if (!newState.settings.playerName) {
        title = "Welcome to Blade";
      } else {
        title = "Name Updated";
      }

      newState.settings.playerName = action.name;

      newState.ui.notification = {
        title,
        message: `Go hard or go home, ${action.name}.`,
      };
      newState.ui.showNotification = true;
      break;

    case "show_notification":
      newState.ui.notification = action.notification;
      newState.ui.showNotification = true;
      break;

    case "clear_notification":
      newState.ui.showNotification = false;
      break;

    case "set_show_modal":
      newState.ui[action.modalKey] = action.data;
      break;

    case "start": {
      if (isSinglePlayer(newState.settings)) {
        newState.isSinglePlayer = true;
      }

      Tricks = new TrickGenerator(newState.settings);
      setTricks(newState);
      newState.players = populateInitialPlayerState(newState);
      newState.gameStarted = true;
      break;
    }

    case "reset_game":
      return {
        ...initialState,
        isSinglePlayer: isSinglePlayer(newState.settings),
        settings: { ...newState.settings },
        trick: getNewTrick(newState),
        nextTrick: getNewTrick(newState),
        players: populateInitialPlayerState(newState),
        gameStarted: true,
      };

    case "quit":
      return { ...initialState, settings: { ...newState.settings } };

    case "pass":
      newState.players[newState.activePlayer].passed.push(newState.trick);
      setTricks(newState);
      break;

    case "landed": {
      if (newState.isSinglePlayer) {
        // If next player is the setter then reset and show a new trick
        if (newState.players[1].hasHadFinalAttempt) {
          newState.players[1].hasHadFinalAttempt = false;
        }

        newState.players[1].landed.push(newState.trick);
        setTricks(newState);

        return newState;
      }

      const activePlayer = newState.activePlayer;
      const nextActivePlayerNo = getNextActivePlayer(newState);

      // Current player has matched the set trick
      if (newState.trickSetBy) {
        newState.players[activePlayer].mustMatch = false;

        // Current player landed final letter trick on second attempt so reset
        if (newState.players[activePlayer].hasHadFinalAttempt) {
          newState.players[activePlayer].hasHadFinalAttempt = false;
        }

        resetIfBackToSetter(nextActivePlayerNo, newState);
      } else {
        // Current player has set the trick
        // All other players must match to avoid a letter
        for (let playerKey in newState.players) {
          if (Number(playerKey) !== activePlayer) {
            newState.players[playerKey].mustMatch = true;
          }
        }

        newState.trickSetBy = activePlayer;
        newState.activePlayer = nextActivePlayerNo;
      }

      newState.players[activePlayer].landed.push(newState.trick);
      newState.activePlayer = nextActivePlayerNo;
      break;
    }

    case "missed":
      if (newState.isSinglePlayer) {
        const firstLetterNotActive = newState.players[1].letters.find(
          (letter) => {
            return !letter.active;
          }
        );

        if (firstLetterNotActive.letter === FINAL_LETTER) {
          if (!newState.players[1].hasHadFinalAttempt) {
            newState.ui.notification = {
              title: "Last Chance",
              message: "You get two attempts on the final letter.",
            };
            newState.ui.showNotification = true;
            newState.players[1].hasHadFinalAttempt = true;
            return newState;
          }

          newState.players[1].out = true;
          newState.gameOver = true;
          newState.winningPlayer = newState.players[1].name;
          newState.winningTrick = newState.trick.name;

          if (newState.players[1].landed.length > newState.settings.topScore) {
            newState.settings.topScore = newState.players[1].landed.length;
          }

          track({ path: "game-over", event: true });
        } else {
          firstLetterNotActive.active = true;
        }

        newState.players[1].missed.push(newState.trick);
        setTricks(newState);

        return newState;
      }

      // Multiplayer
      const activePlayer = newState.activePlayer;
      const nextActivePlayerNo = getNextActivePlayer(newState);

      // Current player fails to match a set trick
      if (newState.trickSetBy) {
        const firstLetterNotActive = newState.players[
          activePlayer
        ].letters.find((letter) => {
          return !letter.active;
        });

        if (firstLetterNotActive.letter === FINAL_LETTER) {
          if (!newState.players[activePlayer].hasHadFinalAttempt) {
            newState.ui.notification = {
              title: "Last Chance",
              message: "Players get two attempts on the final letter.",
            };
            newState.ui.showNotification = true;
            newState.players[activePlayer].hasHadFinalAttempt = true;
            return newState;
          }

          firstLetterNotActive.active = true;
          newState.players[activePlayer].out = true;

          if (isGameOver(newState)) {
            newState.gameOver = true;
            newState.winningPlayer = newState.players[nextActivePlayerNo].name;
            newState.winningTrick = newState.trick.name;
            track({ path: "game-over", event: true });
          }
        } else {
          firstLetterNotActive.active = true;
        }

        resetIfBackToSetter(nextActivePlayerNo, newState);

        newState.players[activePlayer].mustMatch = false;
      } else {
        // Current player fails to land trick with no setter
        setTricks(newState);
      }

      newState.players[activePlayer].missed.push(newState.trick);
      newState.activePlayer = nextActivePlayerNo;

      break;

    default:
      return newState;
  }
}, initialState);
