import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation();
  console.log(location);

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
