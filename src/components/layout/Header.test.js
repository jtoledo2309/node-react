import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "./Header";
import { defaultState } from "../../store/reducers";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  };
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
