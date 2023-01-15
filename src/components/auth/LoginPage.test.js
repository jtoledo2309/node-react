import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { defaultState } from "../../store/reducers";
import LoginPage from "./LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
import { authLoginNotSet } from "../../store/actions";

jest.mock("../../store/actions");

describe("loginPage", () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
    location: () => {},
    navigate: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("deberia lanzar el authloginNotSet", () => {
    const email = "prueba";
    const password = "1234";

    renderComponent();

    const usernameInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();
    fireEvent.change(usernameInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(authLoginNotSet).toHaveBeenCalledWith({ email, password });
  });
});
