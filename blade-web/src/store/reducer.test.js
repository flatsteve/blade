import produce from "immer";

import TrickGenerator from "utils/TrickGenerator";
import reducer from "./reducer";
import initialState, { initialPlayerState } from "./initialState";

jest.mock("utils/TrickGenerator");

describe("reducer", () => {
  let startedState;

  beforeAll(() => {
    TrickGenerator.mockImplementation(() => {
      return {
        generateTrick: () => ({
          id: Math.floor(Math.random() * 100),
          name: "soul",
        }),
      };
    });
  });

  beforeEach(() => {
    startedState = reducer(initialState, { type: "start" });
  });

  it("initializes the game state when started", () => {
    expect(startedState).toMatchObject({
      ...initialState,
      gameOver: false,
      gameStarted: true,
      activePlayer: 1,
      trick: {
        name: "soul",
      },
      nextTrick: {},
      players: {
        1: { ...initialPlayerState },
        2: { ...initialPlayerState },
      },
    });
  });

  it("increments the active player when no on has set and a players misses a trick", () => {
    const newState = reducer(startedState, { type: "missed" });

    expect(newState).toMatchObject({
      activePlayer: 2,
      trick: {},
    });
  });

  it("allocates a letter to a player who misses a set trick", () => {
    startedState = produce(startedState, (newState) => {
      newState.trickSetBy = 1;
      newState.activePlayer = 2;
      newState.players[2].mustMatch = true;
    });

    const newState = reducer(startedState, { type: "missed" });

    expect(newState).toMatchObject({
      activePlayer: 1,
      trick: {},
      players: {
        2: {
          letters: [
            { letter: "B", active: true },
            { letter: "L", active: false },
            { letter: "A", active: false },
            { letter: "D", active: false },
            { letter: "E", active: false },
          ],
          mustMatch: false,
        },
      },
    });
  });

  describe("final letter trick", () => {
    beforeEach(() => {
      startedState = produce(startedState, (newState) => {
        newState.trickSetBy = 1;
        newState.activePlayer = 2;
        newState.players[2].mustMatch = true;
        newState.players[2].letters = [
          { letter: "B", active: true },
          { letter: "L", active: true },
          { letter: "A", active: true },
          { letter: "D", active: true },
          { letter: "E", active: false },
        ];
      });
    });

    it("gives the player two chances at the final letter trick", () => {
      const newState = reducer(startedState, { type: "missed" });

      expect(newState).toMatchObject({
        activePlayer: 2,
        gameOver: false,
        winningPlayer: null,
        winningTrick: null,
        players: {
          2: {
            hasHadFinalAttempt: true,
            mustMatch: true,
            out: false,
          },
        },
      });
    });

    it("ends the game when all players are out", () => {
      startedState = produce(startedState, (newState) => {
        newState.players[2].hasHadFinalAttempt = true;
      });

      const newState = reducer(startedState, { type: "missed" });

      expect(newState).toMatchObject({
        gameOver: true,
        winningPlayer: "Player 1",
        winningTrick: "soul",
        trick: {},
        players: {
          2: {
            letters: [
              { letter: "B", active: true },
              { letter: "L", active: true },
              { letter: "A", active: true },
              { letter: "D", active: true },
              { letter: "E", active: true },
            ],
            mustMatch: false,
            out: true,
          },
        },
      });
    });
  });

  it("sets the setter and sets mustMatch on all other players", () => {
    const newState = reducer(startedState, { type: "landed" });

    expect(newState).toMatchObject({
      activePlayer: 2,
      trick: {},
      trickSetBy: 1,
      players: {
        1: { mustMatch: false },
        2: { mustMatch: true },
      },
    });
  });
});
