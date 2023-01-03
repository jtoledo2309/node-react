import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./components/api/client";
import { AuthContextProvider } from "./components/auth/context";

import configureStore from "./store";

const accesToken = storage.get("auth");
setAuthorizationHeader(accesToken);

const store = configureStore({ auth: !!accesToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Router>
    <AuthContextProvider isInitiallyLogged={!!accesToken}>
      <App />
    </AuthContextProvider>
  </Router>
  //</React.StrictMode>
);
