import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as MagnifierIcon } from "../assets/images/magnifier.svg";
import { selectInputs, setInput } from "../store/uiSlice";

import classes from "./SearchBox.module.scss";

export const SearchBox = () => {
  const { searchPhrase } = useSelector(selectInputs);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setInput({
          name: "searchPhrase",
          value: e.currentTarget.value,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className={classes.searchBox}>
      <MagnifierIcon
        style={{ width: 14 }}
        onClick={() => inputRef.current?.focus()}
      />
      <input
        type="search"
        placeholder={"search"}
        name="search"
        className={classes.searchBox_input}
        onChange={inputChangeHandler}
        value={searchPhrase}
        ref={inputRef}
      />
    </div>
  );
};
