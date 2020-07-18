import React, { useContext, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { AppContext } from "store/Store";

import Setup from "scenes/Setup";
import GameSettings from "scenes/GameSettings";
import Game from "scenes/Game";
import Settings from "scenes/Settings";
import track from "utils/analytics";

export default function () {
  const {
    state: { settings },
  } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    track({ path: location.pathname });
  }, [location]);

  return (
    <Switch>
      <Route path="/blade" exact>
        <Game />
      </Route>

      <Route path="/settings" exact>
        <Settings />
      </Route>

      <Route
        path="/"
        exact
        render={() => (settings.playerNames[1] ? <GameSettings /> : <Setup />)}
      />
    </Switch>
  );
}
