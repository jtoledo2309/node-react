import { useState } from "react";
import Button from "../common/Button";
import FormField from "../common/FormField";
import { useLocation, useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { login, loginNotSet } from "./service";
import CheckBox from "../common/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  authLoginFailure,
  authLoginRequest,
  authLoginSucess,
  uiResetError,
} from "../../store/actions";
import { getUi } from "../../store/selector";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [rememberLogin, setRememberLogin] = useState(false);
  const handleResetError = () => dispatch(uiResetError());

  const handleChangeUsername = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleRememberLogin = (event) => {
    event.target.checked ? setRememberLogin(true) : setRememberLogin(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(authLoginRequest());
      if (rememberLogin) {
        await login({ email, password });
        dispatch(authLoginSucess());
        const previousroute = location.state?.from?.pathname || "/";
        navigate(previousroute, { replace: true });
      } else {
        await loginNotSet({ email, password });
        dispatch(authLoginSucess());
        const previousroute = location.state?.from?.pathname || "/";
        navigate(previousroute, { replace: true });
      }
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };

  const isDisabled = () => {
    return !(email && password && !isLoading);
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Node-React</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Enter your email"
          className="loginForm-field"
          onChange={handleChangeUsername}
          value={email}
        />
        <FormField
          type="password"
          name="password"
          label="Enter your password"
          className="loginForm-field"
          onChange={handleChangePassword}
          value={password}
        />
        <CheckBox
          type="checkbox"
          name="remember-password"
          label="Quiero recordar tu usuario para proximas sesiones"
          onChange={handleRememberLogin}
          value={rememberLogin}
        />
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={isDisabled()}
        >
          LogIn
        </Button>
      </form>

      {error && (
        <div className="loginPage-error" onClick={handleResetError}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
