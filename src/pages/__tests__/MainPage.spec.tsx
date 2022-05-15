import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import store from "../../store/store";
import { MainPage } from "../MainPage";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </BrowserRouter>
  );
};

describe("Todo CRUD functionality", () => {
  let textbox: HTMLElement | null = null;
  let addButton: HTMLElement | null = null;
  beforeEach(() => {
    /**
     *
     * Simulating Adding/deleting todos functionality
     *
     */

    const { getAllByRole } = render(<MockApp />);

    // Step 1: Targeting the Textbox
    textbox = getAllByRole("textbox").find(
      (txt) => txt.getAttribute("name") === "todoTitle"
    );
    // Step 2: Targeting the Button
    addButton = getAllByRole("button").find((btn) => btn.id === "addUser");
  });
  afterEach(cleanup);

  it("should have at least one default todo with title 'Create todo list' as expected", () => {
    expect(screen.getByText(/create todo list/i)).toBeInTheDocument();
  });

  it("should prevent adding empty todo", () => {
    // Step 3: Entering 'Testing' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "Testing" } });
    // value of textbox should be changed
    expect(textbox?.getAttribute("value")).toBe("Testing");
  });
});
