import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import classNames from "classnames";

import "./Header.css";
import { logout } from "../auth/service";

const Header = ({ className, isLogged, onLogout }) => {
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className={classNames("header", className)}>
      <div className="header-logo">
        <Icon width="30" height="30" />
      </div>
      <nav className="header-bar">
        {isLogged ? (
          <Button
            variant="primary"
            className="header-button"
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        ) : (
          <Button variant="primary" className="header-button">
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
