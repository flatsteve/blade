import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";

import App from "./App";

Sentry.init({
  dsn:
    "https://55b8ac873ad44e7db762c935f9eb7201@o259069.ingest.sentry.io/5311034",
});

ReactDOM.render(<App />, document.getElementById("root"));
