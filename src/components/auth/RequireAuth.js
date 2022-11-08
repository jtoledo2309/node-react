import { Navigate, useLocation } from "react-router-dom";
import { AuthContextConsumer } from "./context";

const RequireAuth = ({ isLogged, children }) => {
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

const ConnectedRequiredAuth = (props) => {
  return (
    <AuthContextConsumer>
      {(value) => <RequireAuth isLogged={value.isLogged} {...props} />}
    </AuthContextConsumer>
  );
};

export default ConnectedRequiredAuth;
