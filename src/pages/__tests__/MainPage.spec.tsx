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
  let list: HTMLElement | null = null;
  let textbox: HTMLElement | null = null;
  let addButton: HTMLElement | null = null;
  beforeEach(() => {
    /**
     *
     * Simulating Adding/deleting todos functionality
     *
     */

    const { getAllByRole, getByRole } = render(<MockApp />);

    // Step 0: Targeting the List
    list = getByRole("list");

    // Step 1: Targeting the Textbox
    textbox = getByRole("textbox");
    // Step 2: Targeting the Button
    addButton = getAllByRole("button").find((btn) => btn.id === "addTodo");
  });
  afterEach(cleanup);

  it("should have at least one default todo with title 'Create todo list' as expected", () => {
    expect(screen.getByText(/create todo list/i)).toBeInTheDocument();
  });

  it("should prevent adding empty todo", () => {
    // Step 3: Entering 'Testing' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "" } });

    // Step 4: value of textbox should be changed
    expect(textbox?.getAttribute("value")).toBe("");

    // Step 5: Clicking on Add Button
    fireEvent.click(addButton!);

    // Step 6: Checking list items total after adding
    const { getAllByRole } = within(list!);
    const listItems = getAllByRole("listitem");

    // Step 7: '' should not be in the list
    expect(listItems.length).toBe(1);
  });

  it("should add new todo as expected", () => {
    // Step 3: Entering 'Testing' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "Testing" } });

    // Step 4: value of textbox should be changed
    expect(textbox?.getAttribute("value")).toBe("Testing");

    // Step 5: Clicking on Add Button
    fireEvent.click(addButton!);

    // Step 6: Checking list items total after adding
    const { getByText } = within(list!);
    const listItem = getByText(/testing/i);

    // Step 7: 'Alex' should be in the list
    expect(listItem).toBeInTheDocument();
  });

  it("should not delete todo immediately but showing confirmation dialog", async () => {
    // Step 3: Entering 'Testing' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "should not be deleted" } });

    // Step 4: value of textbox should be changed
    expect(textbox?.getAttribute("value")).toBe("should not be deleted");

    // Step 5: Clicking on Add Button
    fireEvent.click(addButton!);

    // Step 6: Checking list items total after adding
    const { getAllByRole } = within(list!);
    const listItems = getAllByRole("listitem");

    // Step 7: Targeting the delete button of the note
    const { getByRole } = within(listItems[listItems.length - 1]!);
    const deleteButton = getByRole("button");

    // Step 8: Click on delete button on top of each note
    fireEvent.click(deleteButton);

    // Step 9: note 'to be deleted' should be still in the list
    expect(listItems.length).toBe(3);
  });

  it("should delete todo as expected", async () => {
    // Step 3: Entering 'Testing' word inside username textbox
    fireEvent.change(textbox!, { target: { value: "to be deleted" } });

    // Step 4: value of textbox should be changed
    expect(textbox?.getAttribute("value")).toBe("to be deleted");

    // Step 5: Clicking on Add Button
    fireEvent.click(addButton!);

    // Step 6: Checking list items total after adding
    const { getAllByRole } = within(list!);
    let listItems = getAllByRole("listitem");

    // Step 7: Items total should be 4
    expect(listItems.length).toBe(4);

    // Step 8: Targeting the delete button of the note
    const { getByRole } = within(listItems[listItems.length - 1]!);
    const deleteButton = getByRole("button");

    // Step 9: Click on delete button on top of each note
    fireEvent.click(deleteButton);

    // Step 10: Wating for the messagebox to be appear
    await waitFor(() => expect(screen.getByText(/are you sure/i)));
    const MessageBox = screen.getByText(/are you sure/i);
    expect(MessageBox).toBeInTheDocument();

    // Step 11: Targeting the 'ACCEPT' button of the messagebox
    // const { getByText } = within(MessageBox);
    const acceptButton = screen.getByText("Ok");

    // Step 12: Click on 'Accept' button of messagebox
    fireEvent.click(acceptButton);

    await waitFor(() => expect(listItems.length).toBe(4));
    listItems = getAllByRole("listitem");
    // Step 13: note 'to be deleted' should be deleted by now
    expect(listItems.length).toBe(3);
  });
});
