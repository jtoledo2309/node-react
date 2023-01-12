import { advertsLoadedSucess } from "./actions";
import { ADVERTS_LOADED_SUCESS } from "./types";

test("devolver una accion de tipo success", () => {
  const adverts = "adverts";
  const expectedAction = {
    type: ADVERTS_LOADED_SUCESS,
    payload: adverts,
  };

  const action = advertsLoadedSucess(adverts);
  expect(action).toEqual(expectedAction);
});
