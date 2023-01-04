export const getIsLogged = (state) => state.auth;

export const getUniqueAdvert = (state, advertId) =>
  state.adverts.find((advert) => advert.id === advertId);

export const getUi = (state) => state.ui;
