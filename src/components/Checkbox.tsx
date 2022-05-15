import React from "react";

import classes from "./Checkbox.module.scss";

interface ICheckboxProps {
  checked?: boolean;
  onChangeHandle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FunctionComponent<ICheckboxProps> = ({
  checked,
  onChangeHandle,
}) => {
  return (
    <section className={classes.checkbox}>
      <input
        defaultChecked={checked}
        type="checkbox"
        id="status"
        onChange={(e) => onChangeHandle?.(e)}
      />
      <label>{"Done"}</label>
    </section>
  );
};
