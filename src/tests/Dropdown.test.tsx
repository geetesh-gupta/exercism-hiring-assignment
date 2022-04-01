import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Dropdown, { DropdownList, DropdownListItem } from "../elements/Dropdown";

test("renders DropdownListItem element without children", () => {
  render(
    <DropdownListItem
      onClick={() => {
        return;
      }}
    ></DropdownListItem>
  );

  const listItem = screen.getByRole("listitem");
  expect(listItem).toBeEmptyDOMElement();
});

test("renders DropdownListItem element with children", () => {
  render(
    <DropdownListItem>
      <p>Item 1</p>
    </DropdownListItem>
  );

  const listElem = screen.getByRole("listitem");
  const textElem = screen.getByText("Item 1");
  expect(textElem).toBeInTheDocument();
  expect(listElem).toContainElement(textElem);
});

test("renders DropdownList element with multiple children", () => {
  render(
    <DropdownList>
      <DropdownListItem>
        <p>Item 1</p>
      </DropdownListItem>
      <DropdownListItem>
        <p>Item 2</p>
      </DropdownListItem>
      <DropdownListItem>
        <p>Item 3</p>
      </DropdownListItem>
    </DropdownList>
  );

  const listElem = screen.getByRole("list");
  expect(listElem.childElementCount).toEqual(3);
});

test("renders Dropdown element without selected prop", () => {
  render(
    <Dropdown>
      <DropdownListItem>
        <p>Item 1</p>
      </DropdownListItem>
      <DropdownListItem>
        <p>Item 2</p>
      </DropdownListItem>
      <DropdownListItem>
        <p>Item 3</p>
      </DropdownListItem>
    </Dropdown>
  );

  const imgElem = screen.getByRole("img");
  expect(imgElem.getAttribute("alt")).toBe("Loading dropdown items");
});

const Wrapper = () => {
  const [selected, setSelected] = useState({ title: "Item 1" });
  return (
    <Dropdown selected={selected}>
      <DropdownListItem onClick={() => setSelected({ title: "Item 1" })}>
        <p>Item 1</p>
      </DropdownListItem>
      <DropdownListItem onClick={() => setSelected({ title: "Item 2" })}>
        <p>Item 2</p>
      </DropdownListItem>
      <DropdownListItem onClick={() => setSelected({ title: "Item 3" })}>
        <p>Item 3</p>
      </DropdownListItem>
    </Dropdown>
  );
};

describe("renders Dropdown element", () => {
  const user = userEvent.setup();

  it("with selected prop", async () => {
    render(<Wrapper />);

    const buttonElem = screen.getByRole("button");
    expect(buttonElem.textContent).toEqual("Item 1");

    await user.click(buttonElem);
    const listitems = screen.getAllByRole("listitem");
    expect(screen.queryAllByRole("listitem")).not.toBeNull();
    expect(listitems.length).toBe(3);
    expect(listitems[0].textContent).toEqual("Item 1");

    await user.click(listitems[1]);
    expect(screen.queryByRole("listitem")).toBeNull();
    expect(buttonElem.textContent).toEqual("Item 2");
  });
});
