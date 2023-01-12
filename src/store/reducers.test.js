import { authLoginSucess, authLogoutSucess } from "./actions";
import { auth, defaultState } from "./reducers";

describe("auth", () => {
  test("deberia manejar la accion sucess", () => {
    const state = defaultState.auth;
    const action = authLoginSucess();
    const result = auth(state, action);
    expect(result).toBe(true);
  });

  test("deberia manejar la accion logout", () => {
    const state = defaultState.auth;
    const action = authLogoutSucess();
    const result = auth(state, action);
    expect(result).toBe(false);
  });

  test("deberia manejar la accion diferente", () => {
    const state = defaultState.auth;
    const action = { type: "ANY" };
    const result = auth(state, action);
    expect(result).toBe(state);
  });
});
