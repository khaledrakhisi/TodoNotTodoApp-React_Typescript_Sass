import React from "react";

import classes from "./TextureBG.module.scss";

interface ITextureBGProps {
  bgName: string;
}

export const TextureBG: React.FunctionComponent<ITextureBGProps> = ({
  bgName,
}) => {
  return <section className={`${classes.bg} ${classes[bgName]}`}></section>;
};

export default TextureBG;
