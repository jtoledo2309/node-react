import { getUniqueAdvert } from "./selector";

describe("getUniqueAdvert", () => {
  test("devolver el anuncio segun un advert identificador", () => {
    const advertId = "1";
    const adverts = [{ id: advertId }];
    const state = { adverts: { data: adverts } };
    expect(getUniqueAdvert(advertId)(state)).toBe(adverts[0]);
  });

  test("no deberia devolver ningun anuncio", () => {
    const advertId = "1";
    const adverts = [];
    const state = { adverts: { data: adverts } };
    expect(getUniqueAdvert(advertId)(state)).toBe(undefined);
  });
});
