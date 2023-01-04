import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./components/api/client";
import { Provider } from "react-redux";

import configureStore from "./store";

const accesToken = storage.get("auth");
setAuthorizationHeader(accesToken);

const store = configureStore({ auth: !!accesToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  //</React.StrictMode>
);
