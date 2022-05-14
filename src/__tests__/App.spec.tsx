import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import App from "../App";
import store from "../store/store";

const MockApp = () => {
  window.scrollTo = jest.fn();
  const root = document.createElement("div");

  beforeEach(() => {
    document.body.appendChild(root);

    const content = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    render(content, root);
  });
};
const renderComponent = () => render(<MockApp />);
test("if it renders without crashing", async () => {
  const { getByText } = renderComponent();
  await waitFor(() => getByText(/Todo and not Todo/i));

  expect(getByText(/Todo and not Todo/i)).toBeInTheDocument();
});

afterEach(() => {
  global.innerWidth = 1024;
  global.dispatchEvent(new Event("resize"));
});

// test("the App responsivness as expected", async () => {
//   // Change the viewport to 500px.
//   global.innerWidth = 500;
//   // Trigger the window resize event.
//   global.dispatchEvent(new Event("resize"));
//   const { getByTestId } = renderComponent();
//   await waitFor(() => getByTestId("keypic"));

//   expect(getByTestId("keypic")).toBeInTheDocument();
// });
