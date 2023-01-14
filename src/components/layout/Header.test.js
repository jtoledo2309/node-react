import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "./Header";
import { defaultState } from "../../store/reducers";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  test("snapshot", () => {
    const store = {
      getState: () => defaultState,
      dispatch: () => {},
      subscribe: () => {},
    };
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
