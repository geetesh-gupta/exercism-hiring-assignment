import { render, screen } from "@testing-library/react";
import Button from "../elements/Button";

test("renders Button element without children", () => {
  render(
    <Button
      onClick={() => {
        return;
      }}
    ></Button>
  );

  expect(screen.getByRole("button")).toBeEnabled();
  expect(screen.getByRole("button")).toBeEmptyDOMElement();
});

test("renders Button element with children", () => {
  render(
    <Button
      onClick={() => {
        return;
      }}
    >
      <p>Submit</p>
    </Button>
  );

  const btnElem = screen.getByRole("button", { name: "Submit" });
  const textElem = screen.getByText("Submit");
  expect(textElem).toBeInTheDocument();
  expect(btnElem).toBeEnabled();
  expect(btnElem).toContainElement(textElem);
});

test("renders disabled Button element", () => {
  render(
    <Button
      onClick={() => {
        return;
      }}
      disabled
    >
      <p>Submit</p>
    </Button>
  );

  const btnElem = screen.getByRole("button", { name: "Submit" });
  const textElem = screen.getByText("Submit");
  expect(textElem).toBeInTheDocument();
  expect(btnElem).toBeDisabled();
});
