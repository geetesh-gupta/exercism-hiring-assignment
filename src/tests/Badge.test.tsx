import { render, screen } from "@testing-library/react";
import { BadgeWithNum } from "../elements/Badge";

test("renders badgeWithNum element", () => {
  render(<BadgeWithNum badgeCount={1} />);

  expect(screen.getByText("1")).toBeInTheDocument();
});
