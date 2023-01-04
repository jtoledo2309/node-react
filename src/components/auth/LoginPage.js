import { useState } from "react";
import Button from "../common/Button";
import FormField from "../common/FormField";
import { useLocation, useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { login, loginNotSet } from "./service";
import CheckBox from "../common/Checkbox";
import { useDispatch } from "react-redux";
import { authLogin } from "../../store/actions";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberLogin, setRememberLogin] = useState(false);

  const handleChangeUsername = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const resetError = () => setError(null);

  const handleRememberLogin = (event) => {
    event.target.checked ? setRememberLogin(true) : setRememberLogin(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      resetError();
      setIsFetching(true);
      if (rememberLogin) {
        await login({ email, password });
        dispatch(authLogin());
        const previousroute = location.state?.from?.pathname || "/";
        navigate(previousroute, { replace: true });
      } else {
        await loginNotSet({ email, password });
        dispatch(authLogin());
        const previousroute = location.state?.from?.pathname || "/";
        navigate(previousroute, { replace: true });
      }
    } catch (error) {
      setError(error);
      setIsFetching(false);
    }
  };

  const isDisabled = () => {
    return !(email && password && !isFetching);
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
        <div className="loginPage-error" onClick={resetError}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
