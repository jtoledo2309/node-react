import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";

const Header = () => {
  return (
    <header>
      <div>
        <Icon width="30" height="30" />
      </div>
      <nav>
        <Button variant="primary">Login</Button>
      </nav>
    </header>
  );
};

export default Header;
