import { Routes, Route, Navigate } from "react-router-dom";
import AdvertsPage from "./components/adverts/AdvertsPage";
import LoginPage from "./components/auth/LoginPage";
import NewAdvertPage from "./components/adverts/NewAdvertPage";
import AdvertDetail from "./components/adverts/AdvertDetail";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adverts" element={<Layout />}>
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertDetail />} />
          <Route
            path="new"
            element={
              <RequireAuth>
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
