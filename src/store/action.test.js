import {
  advertsLoadedSucess,
  authLoginRequest,
  authLoginNotSet,
  authLoginSucess,
  authLoginFailure,
} from "./actions";
import { ADVERTS_LOADED_SUCESS } from "./types";

describe("advertsLoadedSucess", () => {
  test("devolver una accion de tipo success", () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_SUCESS,
      payload: adverts,
    };

    const action = advertsLoadedSucess(adverts);
    expect(action).toEqual(expectedAction);
  });
});

describe("authLoginNotSet", () => {
  const credentials = "credenciales";
  const action = authLoginNotSet(credentials);
  const dispatch = jest.fn();
  const api = { auth: {} };

  describe("cuando resuelve", () => {
    test("hacer el flujo de login", async () => {
      api.auth.loginNotSet = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.auth.loginNotSet).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSucess());
    });
  });

  describe("cuando rechaza", () => {
    const error = new Error("error");
    test("hacer el flujo de errores", async () => {
      api.auth.loginNotSet = jest.fn().mockRejectedValue(error);
      const promise = action(dispatch, undefined, { api });
      await expect(promise).rejects.toThrowError(error);
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
    });
  });
});
