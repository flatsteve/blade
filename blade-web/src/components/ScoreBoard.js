import React from "react";
import cn from "classnames";

import { MAX_NAME_LENGTH } from "utils/constants";
import { isSinglePlayer, isThreePlayer, isCrewMode } from "utils/utils";

import styles from "./ScoreBoard.module.scss";

import { ReactComponent as Star } from "icons/star.svg";

export default function ScoreBoard({ game }) {
  function getShortPlayerName(name) {
    if (name.length < MAX_NAME_LENGTH) {
      return name;
    }

    return `${name.substring(0, MAX_NAME_LENGTH)}...`;
  }

  return (
    <div>
      <div
        className={cn({
          [styles.board]: true,
          [styles.boardGameOver]: game.gameOver,
          [styles.boardSingle]: isSinglePlayer(game.settings),
          [styles.boardSmall]: isCrewMode(game.settings),
          [styles.board3Player]: isThreePlayer(game.settings),
        })}
      >
        {Object.values(game.players).map((player) => (
          <div
            className={cn({
              [styles.playerContainer]: true,
              [styles.playerContainerOut]: player.out,
            })}
            key={player.number}
          >
            <div
              className={cn({
                [styles.player]: true,
                [styles.playerActive]: game.activePlayer === player.number,
                [styles.playerMustMatch]: player.mustMatch,
              })}
            >
              <h5 className={styles.playerName}>
                {getShortPlayerName(player.name)}{" "}
                {game.trickSetBy === player.number && (
                  <Star className={styles.playerSetterIcon} />
                )}
              </h5>
            </div>

            <div className={styles.scoreContainer}>
              <h5 className={styles.score}>
                {player.letters.map((letter, index) => {
                  return (
                    <span
                      key={index}
                      className={cn({
                        [styles.scoreLetter]: true,
                        [styles.scoreLetterActive]: letter.active,
                      })}
                    >
                      {letter.letter}
                    </span>
                  );
                })}
              </h5>
            </div>
          </div>
        ))}

        {isSinglePlayer(game.settings) ? (
          <div className={styles.landedContainer}>
            <div className={styles.landedCounter}>
              <h4 className={styles.landedCounterText}>
                {game.players[1].landed.length}
              </h4>
            </div>

            <p className={styles.landedLabel}>
              <small>Tricks Landed</small>
            </p>
          </div>
        ) : (
          <div
            className={cn({
              [styles.vs]: true,
              [styles.vsCrew]: isCrewMode(game.settings),
            })}
          >
            <h2 className={styles.vsText}>VS</h2>
          </div>
        )}
      </div>
    </div>
  );
}
