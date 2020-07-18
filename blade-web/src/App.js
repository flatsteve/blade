import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ErrorBoundary } from "@sentry/react";

import Routes from "./Routes";
import Store from "store/Store";

import Exception from "scenes/Exception";

import ServiceWorker from "components/ServiceWorker";
import Notification from "components/Notification";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <ErrorBoundary fallback={Exception}>
        <Store>
          <Router>
            <Routes />
          </Router>

          <Notification />

          <ServiceWorker />
        </Store>
      </ErrorBoundary>
    </div>
  );
}

export default App;
