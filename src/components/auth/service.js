import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../api/client";
import storage from "../../utils/storage";

export const login = (credentials) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set("auth", accessToken);
  });
};

export const loginNotSet = (credentials) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove("auth");
  });
};
