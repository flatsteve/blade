import produce from "immer";

import { grabbedTrick, switchTrick } from "data/modifiers";
import { MAX_DIFFICULTY, NEGATIVE } from "utils/constants";

import {
  trickLib,
  SOUL_TRICK,
  GROOVE_TRICK,
  getRandomEntry,
  getFormattedTrickName,
  isChance,
} from "./utils";

export default class TrickGenerator {
  constructor({ excludeNegatives, excludeWeird, difficulty }) {
    this.tricks = trickLib;
    this.difficulty = difficulty;

    if (excludeNegatives) {
      this.tricks = produce(this.tricks, (newTrickLib) => {
        newTrickLib[SOUL_TRICK].variation = newTrickLib[
          SOUL_TRICK
        ].variation.filter((variation) => variation.name !== NEGATIVE);
      });
    }

    console.log(this.tricks);

    if (excludeWeird) {
      this.tricks = produce(this.tricks, (newTrickLib) => {
        for (let trickType in newTrickLib) {
          newTrickLib[trickType].base = newTrickLib[trickType].base.filter(
            (base) => !base.weird
          );
        }
      });
    }

    if (difficulty < MAX_DIFFICULTY) {
      this.tricks = produce(this.tricks, (newTrickLib) => {
        for (let trickType in newTrickLib) {
          for (let trickPart in newTrickLib[trickType]) {
            newTrickLib[trickType][trickPart] = newTrickLib[trickType][
              trickPart
            ].filter((trick) => trick.difficulty <= difficulty);
          }
        }
      });
    }

    const totalSoulTricks = Object.values(this.tricks[SOUL_TRICK]).reduce(
      (total, parts) => {
        total = total * parts.length;
        return total;
      },
      1
    );

    const totalGrooveTricks =
      Object.values(this.tricks[GROOVE_TRICK]).reduce((total, parts) => {
        total = total * parts.length;
        return total;
      }, 1) - 2; // TODO this stinks. There are two groove tricks with variations hence this ugliness.

    this.maxCombinations = totalSoulTricks + totalGrooveTricks;
  }

  generateTrick() {
    let variation;
    let base;
    let spin;
    let grabbed = false;
    let isSwitch = false;

    // 50 / 50 chance for base trick type
    const baseTrickType = isChance(50) ? SOUL_TRICK : GROOVE_TRICK;
    let tricksByType = this.tricks[baseTrickType];

    base = getRandomEntry(tricksByType.base);

    // If the base trick is one footed difficultly is 2 or more 40% chance of grab
    if (base.one_footed && this.difficulty > 1 && isChance(40)) {
      grabbed = grabbedTrick;
    }

    // If difficultly is 3 or more 20% chance of switch
    if (this.difficulty === MAX_DIFFICULTY && isChance(20)) {
      isSwitch = switchTrick;
    }

    if (!base.hasNoVariation) {
      variation = getRandomEntry(tricksByType.variation);
    }

    spin = getRandomEntry(tricksByType.spin);

    const filteredTrickParts = [
      grabbed,
      isSwitch,
      spin,
      variation,
      base,
    ].filter((trickPart) => Boolean(trickPart)); // Remove any null values

    const combinedTrickID = filteredTrickParts
      .map((trickPart) => trickPart.id)
      .join("");

    const combinedTrickName = filteredTrickParts
      .map((trickPart) => trickPart.name)
      .join(" ");

    // Clean up any whitespace
    let formattedTrickName = getFormattedTrickName(combinedTrickName);

    const trickDescription = filteredTrickParts.reduce((obj, trickPart) => {
      if (trickPart.name) {
        obj[trickPart.name] = trickPart.description;
      }

      return obj;
    }, {});

    const trickPayload = {
      id: combinedTrickID,
      name: formattedTrickName,
      description: trickDescription,
      image: base.name.replace(" ", "-"), // TODO build image name
    };

    console.log("--- TRICK ---", trickPayload);

    return trickPayload;
  }
}
