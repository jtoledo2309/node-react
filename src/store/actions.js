import { AUTH_LOGIN, AUTH_LOGOUT, ADVERTS_LOADED } from "./types.js";

export const authLogin = () => ({
  type: AUTH_LOGIN,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const advertsLoaded = (adverts) => ({
  type: ADVERTS_LOADED,
  payload: adverts,
});
