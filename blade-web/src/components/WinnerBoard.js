import React from "react";
import cn from "classnames";

import { isSinglePlayer } from "utils/utils";

import Button from "components/common/Button";
import ButtonLink from "components/common/ButtonLink";

import { ReactComponent as Wheel } from "icons/wheel.svg";

import styles from "./WinnerBoard.module.scss";

export default function WinnerBoard({
  game,
  handleBackToSetup,
  handleResetGame,
}) {
  return (
    <div
      className={cn({
        [styles.board]: true,
        [styles.boardActive]: game.gameOver,
      })}
    >
      <Wheel className={styles.boardIcon} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isSinglePlayer(game.settings) ? (
              <span>Game Over</span>
            ) : (
              <span>{game.winningPlayer} Wins</span>
            )}
          </h1>

          <p className={styles.subTitle}>
            {isSinglePlayer(game.settings) ? "Final Trick:" : "With"}{" "}
            {game.winningTrick}
          </p>
        </div>

        <div
          className={cn({
            [styles.stats]: true,
            [styles.statsSingle]: isSinglePlayer(game.settings),
          })}
        >
          {Object.values(game.players).map((player) => (
            <table key={player.number}>
              <tbody>
                <tr>
                  <th colSpan="2">{player.name}</th>
                </tr>
                <tr>
                  <td>Landed</td>
                  <td>{player.landed.length}</td>
                </tr>
                <tr>
                  <td>Missed</td>
                  <td>{player.missed.length}</td>
                </tr>
                <tr>
                  <td>Passed</td>
                  <td>{player.passed.length}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>

        <div className={styles.actions}>
          <Button onClick={handleBackToSetup}>Back to Setup</Button>

          <ButtonLink onClick={handleResetGame}>
            Reset &amp; Play Again
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
