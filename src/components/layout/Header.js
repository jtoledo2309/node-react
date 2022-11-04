import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import classNames from "classnames";

import "./Header.css";

const Header = ({ className }) => {
  return (
    <header className={classNames("header", className)}>
      <div className="header-logo">
        <Icon width="30" height="30" />
      </div>
      <nav className="header-bar">
        <Button variant="primary" className="header-button">
          Login
        </Button>
      </nav>
    </header>
  );
};

export default Header;
