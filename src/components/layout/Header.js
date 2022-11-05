import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { logout } from "../auth/service";

const Header = ({ className, isLogged, onLogout }) => {
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className={classNames("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="30" height="30" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new" end>
          Añadir producto{" "}
        </NavLink>
        <NavLink to="/adverts" end>
          Listado de productos
        </NavLink>
        {isLogged ? (
          <Button
            variant="primary"
            className="header-button"
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        ) : (
          <Button
            as={Link}
            to="/login"
            variant="primary"
            className="header-button"
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
