import React from "react";

import classes from "./Checkbox.module.scss";

export const Checkbox = () => {
  return (
    <section className={classes.checkbox}>
      <input type="checkbox" id="status" />
      <label htmlFor="status">{"Done"}</label>
    </section>
  );
};
