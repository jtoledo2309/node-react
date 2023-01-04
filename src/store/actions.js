import {
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
} from "./types.js";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSucess = () => ({
  type: AUTH_LOGIN_SUCESS,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const advertsLoaded = (adverts) => ({
  type: ADVERTS_LOADED,
  payload: adverts,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
