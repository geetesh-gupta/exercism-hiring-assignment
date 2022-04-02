import "@testing-library/react/dont-cleanup-after-each";
import {
  cleanup,
  render,
  Screen,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestimonialsContainer from "../components/TestimonialsContainer";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { APIRoutes } from "../utils/apiUtils";
import { getTestimonials, getTracks } from "./api";
const { queryByRole, getByRole, getAllByRole, getAllByTestId } = screen;

describe("renders TestimonialsContainer component", () => {
  const server = setupServer(
    rest.get(APIRoutes.Tracks, (req, res, ctx) => {
      ctx.delay(200);
      return res(ctx.json(getTracks()));
    }),

    rest.get(APIRoutes.Testimonials, (req, res, ctx) => {
      const page = parseInt(req.url.searchParams.get("page") || "1");
      const track = req.url.searchParams.get("track") || "";
      const order = req.url.searchParams.get("order") || "newest_first";
      const exercise = req.url.searchParams.get("exercise") || "";
      ctx.delay(200);
      return res(ctx.json(getTestimonials(track, exercise, order, page)));
    })
  );

  const waitForLoader = async (screen: Screen) => {
    // Wait for loader to show
    await waitFor(() =>
      expect(queryByRole("img", { name: "Loading icon" })).not.toBeNull()
    );
    // Wait for loader to hide
    await waitFor(() =>
      expect(queryByRole("img", { name: "Loading icon" })).toBeNull()
    );
  };

  beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
    cleanup();
  });

  const user = userEvent.setup();

  it("base case on load", async () => {
    render(<TestimonialsContainer />);

    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(5);
    const btns = getAllByRole("button");
    expect(btns.length).toEqual(8);
    expect(queryByRole("img", { name: "All" })).not.toBeNull();

    expect(queryByRole("textbox")).not.toBeNull();
    const inputElem: HTMLInputElement = getByRole("textbox");
    expect(inputElem.value).toEqual("");
    expect(btns[1].textContent).toEqual("Sort by Most Recent");
    expect(btns[2]).toBeDisabled();
    expect(btns[3].textContent).toEqual("1");
    expect(btns[btns.length - 2].textContent).toEqual("10");
    expect(btns[btns.length - 1]).toBeEnabled();
  });

  it("on change tracks", async () => {
    let btns = getAllByRole("button");

    await user.click(btns[0]);
    expect(getAllByRole("list").length).toEqual(1);
    let dropdownElems = getAllByRole("listitem");
    await user.click(dropdownElems[2]);
    expect(dropdownElems[2].textContent).toEqual("Java40");
    await waitForLoader(screen);
    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(5);
    btns = getAllByRole("button");
    expect(btns.length).toEqual(8);
    expect(btns[3].textContent).toEqual("1");
    expect(btns[4].textContent).toEqual("2");
    expect(btns[5].textContent).toEqual("3");
    expect(btns[6].textContent).toEqual("8");
    expect(btns[7].textContent).toEqual("Next");

    await user.click(btns[0]);
    expect(getAllByRole("list").length).toEqual(1);
    dropdownElems = getAllByRole("listitem");
    expect(dropdownElems.length).toEqual(3);
    expect(dropdownElems[1].textContent).toEqual("C++9");
    await user.click(dropdownElems[1]);
    await waitForLoader(screen);
    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(5);
    btns = getAllByRole("button");
    expect(btns.length).toEqual(6);
    expect(btns[2].textContent).toEqual("Previous");
    expect(btns[2]).toBeDisabled();
    expect(btns[3].textContent).toEqual("1");
    expect(btns[4].textContent).toEqual("2");
    expect(btns[5].textContent).toEqual("Next");
    expect(btns[5]).toBeEnabled();
  });

  it("on change page", async () => {
    let btns = getAllByRole("button");

    await user.click(btns[4]);
    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(4);
    btns = getAllByRole("button");
    expect(btns.length).toEqual(6);
    expect(btns[2].textContent).toEqual("Previous");
    expect(btns[2]).toBeEnabled();
    expect(btns[3].textContent).toEqual("1");
    expect(btns[4].textContent).toEqual("2");
    expect(btns[5].textContent).toEqual("Next");
    expect(btns[5]).toBeDisabled();
  });

  it("on sort change", async () => {
    const btns = getAllByRole("button");

    expect(btns[1].textContent).toEqual("Sort by Most Recent");
    let links = getAllByTestId("created_at");
    expect(links[0].textContent).toEqual("7 months ago");
    expect(links[1].textContent).toEqual("9 months ago");
    expect(links[2].textContent).toEqual("10 months ago");
    expect(links[3].textContent).toEqual("11 months ago");

    await user.click(btns[1]);
    expect(getAllByRole("list").length).toEqual(1);
    const dropdownElems = getAllByRole("listitem");
    expect(dropdownElems[1].textContent).toEqual("Oldest First");
    await user.click(dropdownElems[1]);
    await waitForLoader(screen);
    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(4);
    links = getAllByTestId("created_at");
    expect(links[0].textContent).toEqual("5 months ago");
    expect(links[1].textContent).toEqual("4 months ago");
    expect(links[2].textContent).toEqual("3 months ago");
    expect(links[3].textContent).toEqual("2 months ago");
  });

  it("on change exercise filter", async () => {
    let inputElem: HTMLInputElement = getByRole("textbox");

    await user.type(inputElem, "Tri");
    inputElem = getByRole("textbox");
    expect(inputElem.value).toEqual("Tri");
    await waitForLoader(screen);
    await waitFor(() => getAllByRole("link"));
    expect(getAllByRole("link").length).toEqual(1);
    const btns = getAllByRole("button");
    expect(btns.length).toEqual(5);
    expect(btns[2].textContent).toEqual("Previous");
    expect(btns[2]).toBeDisabled();
    expect(btns[3].textContent).toEqual("1");
    expect(btns[4].textContent).toEqual("Next");
    expect(btns[4]).toBeDisabled();
  });
});
