import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import PaginationHandler from "../components/PaginationHandler";

const Wrapper = ({ numPages }: { numPages: number }) => {
  const [activePage, setActivePage] = useState(1);
  return (
    <PaginationHandler
      activePage={activePage}
      numPages={numPages}
      onPageChange={function (oldPage: number, newPage: number): void {
        setActivePage(newPage);
      }}
    />
  );
};

describe("renders PaginationHandler component", () => {
  const isBtnActive = (btn: HTMLElement) => {
    return btn
      .getAttribute("class")
      ?.includes("border-paginationCurrent bg-paginationCurrent");
  };

  it("base case", () => {
    render(<Wrapper numPages={5} />);
    let allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(7);
    expect(allBtns[0]).toBeDisabled();
    expect(allBtns[allBtns.length - 1]).toBeEnabled();
    expect(isBtnActive(allBtns[1])).toBeTruthy();
    expect(isBtnActive(allBtns[2])).toBeFalsy();

    userEvent.click(allBtns[2]);
    allBtns = screen.getAllByRole("button");
    expect(isBtnActive(allBtns[2])).toBeTruthy();
    expect(isBtnActive(allBtns[1])).toBeFalsy();
    expect(allBtns[0]).toBeEnabled();

    userEvent.click(allBtns[allBtns.length - 1]);
    allBtns = screen.getAllByRole("button");
    expect(isBtnActive(allBtns[3])).toBeTruthy();

    userEvent.click(allBtns[allBtns.length - 2]);
    allBtns = screen.getAllByRole("button");
    expect(isBtnActive(allBtns[allBtns.length - 2])).toBeTruthy();
    expect(allBtns[0]).toBeEnabled();
    expect(allBtns[allBtns.length - 1]).toBeDisabled();
  });

  it("base case with single ... 6 pages", () => {
    render(<Wrapper numPages={6} />);
    let allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(6);
    expect(screen.getAllByText(/\.\.\./i).length).toBe(1);

    userEvent.click(allBtns[allBtns.length - 2]);
    allBtns = screen.getAllByRole("button");
    expect(screen.getAllByText(/\.\.\./i).length).toBe(1);
  });

  it("base case with dynamic ... 10 pages", () => {
    render(<Wrapper numPages={10} />);
    let allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(6);
    expect(screen.getAllByText(/\.\.\./i).length).toBe(1);

    userEvent.click(allBtns[3]);
    allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(8);

    userEvent.click(allBtns[5]);
    allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(9);
    expect(screen.getAllByText(/\.\.\./i).length).toBe(2);

    userEvent.click(allBtns[allBtns.length - 2]);
    allBtns = screen.getAllByRole("button");
    expect(allBtns.length).toBe(6);
    expect(screen.getAllByText(/\.\.\./i).length).toBe(1);
    expect(allBtns[allBtns.length - 1]).toBeDisabled();
  });
});
