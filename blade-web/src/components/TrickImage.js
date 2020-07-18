import React, { useState, useEffect } from "react";

import SwitchTransition from "components/animations/SwitchTransition";

import styles from "./TrickImage.module.scss";

export default function ({
  trick,
  nextTrick,
  handleShowMissingImageModal,
  handleClickTrickImage,
}) {
  const [missingImage, setMissingImage] = useState(false);

  useEffect(() => {
    const preLoadImg = new Image();
    preLoadImg.src = `/images/${nextTrick.image}.jpg`;
  }, [nextTrick]);

  return (
    <div className={styles.container}>
      {missingImage && (
        <div className={styles.missing} onClick={handleShowMissingImageModal}>
          <div>
            <h3 className={styles.missingTitle}>Your image here...</h3>

            <p className={styles.missingDescription}>
              Sorry, I don't have an image for this trick yet. Tap this area for
              info on how you can help.
            </p>
          </div>
        </div>
      )}

      <SwitchTransition transitionKey={trick.id} styles={styles}>
        <img
          className={styles.trickImage}
          src={`/images/${trick.image}.jpg`}
          alt={trick.name}
          onLoad={() => setMissingImage(false)}
          onError={() => setMissingImage(true)}
          onClick={handleClickTrickImage}
        />
      </SwitchTransition>
    </div>
  );
}
