import { BLADE } from "utils/constants";

export const initialPlayerState = {
  landed: [],
  missed: [],
  passed: [],
  out: false,
  mustMatch: false,
  hasHadFinalAttempt: false,
  letters: [...BLADE].map((letter) => ({
    active: false,
    letter,
  })),
};

const initialState = {
  settings: {
    playerName: null,
    topScore: 0,
    players: 2,
    difficulty: 1,
    excludeNegatives: false,
    excludeWeird: false,
    allowPassing: true,
  },
  ui: {
    notification: { title: "", message: "" },
    showNotification: false,
    showInfoModal: false,
    showTrickModal: false,
    showMissingImageModal: false,
  },
  gameStarted: false,
  gameOver: false,
  activePlayer: 1,
  trick: null,
  nextTrick: null,
  trickSetBy: null,
  winningPlayer: null,
  winningTrick: null,
};

export default initialState;
