import { useContext, useEffect } from "react";
import * as serviceWorker from "../serviceWorker";

import { AppContext } from "store/Store";

export default function () {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });

          dispatch({
            type: "show_notification",
            notification: {
              title: "Update Available",
              message: "Press OK for latest features.",
              persist: true,
              withAction: true,
            },
          });
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
