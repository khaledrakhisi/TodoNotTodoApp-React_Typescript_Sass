import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, waitFor, within } from "@testing-library/react";

import App from "../App";
import store from "../store/store";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
describe("App testing", () => {
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

  test("the App responsivness as expected", async () => {
    // Change the viewport to 500px.
    global.innerWidth = 500;
    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));
    const { getByTestId } = renderComponent();
    await waitFor(() => getByTestId("createarea"));

    expect(getByTestId("createarea")).toBeInTheDocument();
  });

  test("test the search todo functionality", () => {
    /**
     *
     * Simulating Searching todos functionality
     *
     */

    const { getAllByRole, getByRole } = render(<MockApp />);

    // Step 1: Targeting the Searchbox
    const searchbox = getByRole("searchbox");

    // Step 2: Targeting the List
    const list = getByRole("list");

    // Step 3: Targeting the Textbox
    const textbox = getByRole("textbox");

    // Step 3: Targeting the Button
    const addButton = getAllByRole("button").find(
      (btn) => btn.id === "addTodo"
    );

    // Step 5: Entering 'to be searched' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "to be searched" } });

    // Step 6: value of textbox should be changed as expected
    expect(textbox?.getAttribute("value")).toBe("to be searched");

    // Step 7: Clicking on Add Button
    fireEvent.click(addButton!);

    // Step 8: Targeting list items total after adding
    let listItems = within(list!).getAllByRole("listitem");

    // Step 7: '' should not be in the list
    expect(listItems.length).toBe(2);

    // Step 8: typing 'searched' phrase inside searchbox
    fireEvent.change(searchbox, { target: { value: "searched" } });

    // Step 9: getting the total of list items after typing on searchbox
    listItems = within(list!).getAllByRole("listitem");

    // Step 10: '' should not be in the list
    expect(listItems.length).toBe(1);
  });
});
