export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
  state.adverts.areLoaded ? state.adverts.data : [];

export const areAdvertsLoaded = (state) => state.adverts.areLoaded;

export const getUniqueAdvert = (advertId) => (state) =>
  state.adverts.data.find((advert) => advert.id.toString() === advertId);

export const getUi = (state) => state.ui;
