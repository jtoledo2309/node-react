import client from "../api/client";

export const getAdverts = () => {
  const url = "/api/v1/adverts";
  return client.get(url);
};
