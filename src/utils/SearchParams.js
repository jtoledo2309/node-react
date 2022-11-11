import client from "../components/api/client";

export const getEndpoint = (query) => {
  let url = "http://localhost:3001/api/v1/adverts?";

  for (let key in query) {
    const value = query[key];

    if (Array.isArray(value)) {
      for (let subValue of value) {
        url += `${key}=${subValue}&`;
      }
    } else {
      url += `${key}=${value}&`;
    }
  }

  return url.slice(0, -1);
};

export const getAdvertsFiltered = (endpoint) => {
  return client.get(endpoint);
};
