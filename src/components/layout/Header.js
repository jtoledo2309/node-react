import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { logout } from "../auth/service";
import { useAuth } from "../auth/context";

const Header = ({ className }) => {
  const { isLogged, handleLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    handleLogout();
  };

  return (
    <header className={classNames("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="30" height="30" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new" className="header-addProduct" end>
          Añadir producto{" "}
        </NavLink>
        <NavLink to="/adverts" className="header-listProduct" end>
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
