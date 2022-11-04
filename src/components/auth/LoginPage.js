import { useState } from "react";
import Button from "../common/Button";
import FormField from "./FormField";

import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);
  };

  const isDisabled = () => {
    return !(username && password);
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Node-React</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="Enter your email"
          className="loginForm-field"
          onChange={handleChangeUsername}
          value={username}
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
    </div>
  );
};

export default LoginPage;
