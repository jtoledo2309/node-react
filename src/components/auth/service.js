import client, { setAuthorizationHeader } from "../api/client";
import storage from "../../utils/storage";

export const login = (credentials) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set("auth", accessToken);
  });
};
