import { areAdvertsLoaded, getUniqueAdvert } from "./selector.js";
import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCESS,
  ADVERTS_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCESS,
  ADVERT_DELETED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCESS,
  TAGS_LOADED_FAILURE,
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

export const authLoginSet = (credenciales) => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.login(credenciales);
      dispatch(authLoginSucess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export const authLoginNotSet = (credenciales) => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.loginNotSet(credenciales);
      dispatch(authLoginSucess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export const authLogoutSucess = () => ({
  type: AUTH_LOGOUT,
});

export const authLogout = () => {
  return async function (dispatch, getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutSucess());
  };
};

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSucess = (adverts) => ({
  type: ADVERTS_LOADED_SUCESS,
  payload: adverts,
});

export const advertsLoadedFailure = (error) => ({
  type: ADVERTS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const advertsLoad = (advertFiltered) => {
  return async function (dispatch, getState, { api }) {
    // const areLoaded = areAdvertsLoaded(getState());
    // if (areLoaded) return;

    try {
      dispatch(advertsLoadedRequest());
      const adverts = advertFiltered || (await api.adverts.getAdverts());
      dispatch(advertsLoadedSucess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
      throw error;
    }
  };
};

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSucess = (advert) => ({
  type: ADVERT_LOADED_SUCESS,
  payload: advert,
});

export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const advertLoad = (advertId) => {
  return async function (dispatch, getState, { api }) {
    const isLoaded = getUniqueAdvert(advertId)(getState());
    if (isLoaded) return;

    try {
      dispatch(advertLoadedRequest());
      const advert = await api.adverts.getAdvertsDetail(advertId);
      dispatch(advertLoadedSucess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      throw error;
    }
  };
};

export const advertCreatedRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});

export const advertCreatedSucess = (advert) => ({
  type: ADVERT_CREATED_SUCESS,
  payload: advert,
});

export const advertCreatedFailure = (error) => ({
  type: ADVERT_CREATED_FAILURE,
  payload: error,
  error: true,
});

export const advertCreated = (advert) => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(advertCreatedRequest());
      const createdAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertCreatedSucess(createdAdvert));
      return createdAdvert;
    } catch (error) {
      dispatch(advertCreatedFailure(error));
      throw error;
    }
  };
};

export const advertDeletedRequest = () => ({
  type: ADVERT_DELETED_REQUEST,
});

export const advertDeletedSucess = (advert) => ({
  type: ADVERT_DELETED_SUCESS,
  payload: advert,
});

export const advertDeletedFailure = (error) => ({
  type: ADVERT_DELETED_FAILURE,
  payload: error,
  error: true,
});

export const advertDeleted = (advert) => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(advertDeletedRequest());
      await api.adverts.removeAdvert(advert.id);
      dispatch(advertDeletedSucess(advert.id));
    } catch (error) {
      dispatch(advertDeletedFailure(error));
      throw error;
    }
  };
};

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedSucess = (tags) => ({
  type: TAGS_LOADED_SUCESS,
  payload: tags,
});

export const tagsLoadedFailure = (error) => ({
  type: TAGS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tagsLoad = () => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(tagsLoadedRequest());
      const tags = await api.adverts.getTags();
      dispatch(tagsLoadedSucess(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
