import { useState } from "react";
import Button from "../common/Button";
import FormField from "../common/FormField";
import { useLocation, useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { login } from "./service";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeUsername = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      resetError();
      setIsFetching(true);
      await login({ email, password });
      onLogin();
      const previousroute = location.state?.from?.pathname || "/";
      navigate(previousroute, { replace: true });
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
