import client from "../api/client";

const advertUrl = "/api/v1/adverts";

export const getAdverts = () => {
  const url = advertUrl;
  return client.get(url);
};

export const getAdvertsDetail = (advertId) => {
  const url = `${advertUrl}/${advertId}`;
  return client.get(url);
};

export const getTags = () => {
  const url = `${advertUrl}/tags`;
  return client.get(url);
};

export const createAdvert = (advert) => {
  const url = advertUrl;
  return client.post(url, advert);
};
