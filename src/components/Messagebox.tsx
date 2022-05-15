import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import {
  EMessageboxResult,
  selectMessagebox,
  showMessageBox,
} from "../store/uiSlice";

import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

import classes from "./Messagebox.module.scss";

export const Messagebox = () => {
  const {
    message,
    title,
    visible,
    hasCancelButton,
    hasOkButton,
    hasCloseButton,
  } = useSelector(selectMessagebox);
  const dispatch = useDispatch();

  const closeMessagebox = useCallback(
    (res: EMessageboxResult) => {
      dispatch(
        showMessageBox({
          message,
          title,
          visible: false,
          hasOkButton,
          hasCancelButton,
          hasCloseButton,
          result: res,
        })
      );
    },
    [dispatch, hasOkButton, hasCancelButton, hasCloseButton, message, title]
  );

  return (
    <CSSTransition
      in={visible}
      timeout={200}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <section className={classes.container}>
        <div className={classes.titlebar}>
          {title}
          <CloseButton
            onClickHandle={() => closeMessagebox(EMessageboxResult.CLOSE)}
          />
        </div>
        <div className={classes.message}>{message}</div>
        <div className={classes.buttons}>
          {hasCancelButton && (
            <Button onClick={() => closeMessagebox(EMessageboxResult.CANCEL)}>
              Cancel
            </Button>
          )}
          {hasCloseButton && (
            <Button onClick={() => closeMessagebox(EMessageboxResult.CLOSE)}>
              Close
            </Button>
          )}
          {hasOkButton && (
            <Button
              onClick={() => {
                closeMessagebox(EMessageboxResult.ACCEPT);
              }}
            >
              Ok
            </Button>
          )}
        </div>
      </section>
    </CSSTransition>
  );
};
