import { Routes, Route, Navigate } from "react-router-dom";

import { useState } from "react";
import AdvertsPage from "./components/adverts/AdvertsPage";
import LoginPage from "./components/auth/LoginPage";
import NewAdvertPage from "./components/adverts/NewAdvertPage";
import AdvertDetail from "./components/adverts/AdvertDetail";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./components/layout/Layout";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/adverts"
          element={<Layout isLogged={isLogged} onLogout={handleLogout} />}
        >
          <Route index element={<AdvertsPage />} />
          <Route path="/adverts/:advertId" element={<AdvertDetail />} />
          <Route
            path="adverts/new"
            element={
              <RequireAuth isLogged={isLogged}>
                <NewAdvertPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/404" element={<div>Error 404 / Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
