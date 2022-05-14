import React from "react";
import { createPortal } from "react-dom";

import classes from "./TextureBG.module.scss";

interface ITextureBGProps {
  bgName: string;
}

export const TextureBG: React.FunctionComponent<ITextureBGProps> = ({
  bgName,
}) => {
  return createPortal(
    <section className={`${classes.bg} ${classes[bgName]}`}></section>,
    document.getElementById("hook-texturebg") as HTMLElement
  );
};

export default TextureBG;
