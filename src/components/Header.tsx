import { SearchBox } from "./SearchBox";

import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.mainHeader}>
      <h2 className="title"> Todo and not Todo </h2>
      <SearchBox />
    </header>
  );
};

export default Header;
