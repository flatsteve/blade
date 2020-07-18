import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Transition from "components/animations/Transition";
import { ReactComponent as Cross } from "icons/cross.svg";

import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modal-root");

export default function ({
  title,
  children,
  isOpen,
  contentFooter,
  handleClose,
}) {
  const modal = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRoot.classList.add("modal-open");
    }

    return () => {
      modalRoot.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <div ref={modal}>
      {createPortal(
        <Transition inProp={isOpen} styles={styles}>
          <>
            <div className={styles.modal} id="modal">
              <div className={styles.header}>
                <h3 className={styles.headerTitle}>{title}</h3>

                <button className={styles.headerClose} onClick={handleClose}>
                  <Cross />
                </button>
              </div>

              <div className={styles.content}>
                {children}

                {contentFooter && (
                  <div className={styles.contentFooter}>{contentFooter}</div>
                )}
              </div>
            </div>

            <div className={styles.modalClose} onClick={handleClose}></div>
          </>
        </Transition>,
        modalRoot
      )}
    </div>
  );
}
