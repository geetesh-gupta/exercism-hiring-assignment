import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Search from "../elements/Search";

const Wrapper = () => {
  const [state, setState] = useState("");
  return (
    <Search
      value={state}
      onChange={(val) => {
        setState(val);
      }}
      placeholder={"Placeholder"}
    />
  );
};

test("renders DropdownListItem element without children", async () => {
  const user = userEvent.setup();

  render(<Wrapper />);
  const inputElem: HTMLInputElement = screen.getByRole("textbox");
  expect(inputElem.name).toEqual("Filter by Exercise");
  expect(inputElem.placeholder).toEqual("Placeholder");
  await user.type(inputElem, "TestValue");
  expect(inputElem.value).toEqual("TestValue");
});
