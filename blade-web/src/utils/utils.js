import { initialPlayerState } from "store/initialState";

import soulTricks from "data/soul-tricks.json";
import grooveTricks from "data/groove-tricks.json";
import soulVariations from "data/soul-variations.json";
import grooveVariations from "data/groove-variations.json";
import soulSpins from "data/soul-spins.json";
import grooveSpins from "data/groove-spins.json";
import aliases from "data/aliases.json";

export const SOUL_TRICK = "soul";
export const GROOVE_TRICK = "groove";

export const trickLib = {
  [SOUL_TRICK]: {
    base: soulTricks,
    variation: soulVariations,
    spin: soulSpins,
  },
  [GROOVE_TRICK]: {
    base: grooveTricks,
    variation: grooveVariations,
    spin: grooveSpins,
  },
};

export function getRandomEntry(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function isChance(percentage) {
  const amount = percentage / 100;

  return Math.random() <= amount;
}

export function getArrayFromNum(number) {
  return [...Array(number).keys()].map((i) => i + 1);
}

export function populateInitialPlayerState({ settings }) {
  return getArrayFromNum(settings.players).reduce((playersObj, number) => {
    playersObj[number] = {
      ...initialPlayerState,
      number,
      name: settings.playerNames[number] || `Player ${number}`,
    };

    return playersObj;
  }, {});
}

export function getNextActivePlayer(state) {
  const activePlayers = Object.values(state.players)
    .filter((player) => !player.out)
    .map((player) => player.number);

  const currentIndex = activePlayers.indexOf(state.activePlayer);
  const nextPlayerNumber =
    activePlayers[(currentIndex + 1) % activePlayers.length];

  return nextPlayerNumber;
}

export function isGameOver(state) {
  const remainingPlayers = Object.values(state.players).filter(
    (player) => !player.out
  );

  return remainingPlayers.length === 1;
}

export function isSinglePlayer(settings) {
  return settings.players === 1;
}

export function isThreePlayer(settings) {
  return settings.players === 3;
}

export function isCrewMode(settings) {
  return settings.players > 2;
}

export function getFormattedTrickName(unformattedName) {
  let formattedTrickName = unformattedName.trim().replace(/  +/g, " ");

  aliases.forEach((alias) => {
    const aliasParts = alias.name.split(" ");

    // Check if a full alias exists in the original trick name
    const hasAlias = aliasParts.every((aliasPart) => {
      return formattedTrickName.includes(aliasPart);
    });

    // If it does remove the words that have an alias
    if (hasAlias) {
      const filteredTrickNameArr = formattedTrickName
        .split(" ")
        .filter((trickPart) => {
          return !aliasParts.includes(trickPart);
        });

      // Add the alias to the end of the stripped trick name as the trick alias always comes at the end
      formattedTrickName = [...filteredTrickNameArr, alias.alias].join(" ");
    }
  });

  return formattedTrickName;
}
