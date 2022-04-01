import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import TestimonialsFilterBar from "../components/FilterBar";
import { SortSlugEnum } from "../types/testimonials";
import { TrackWithTestimonialCountType } from "../types/tracks";
import loaderIcon from "../assets/images/loader.svg";

const Wrapper = () => {
  const [query, setQuery] = useState("");
  const [sortSlug, setSortSlug] = useState(SortSlugEnum.newest_first);
  const [tracks, setTracks] = useState<TrackWithTestimonialCountType[]>([
    {
      slug: "test1",
      title: "test1",
      icon_url: loaderIcon,
      testimonialCount: 1,
    },
    {
      slug: "test2",
      title: "test2",
      icon_url: loaderIcon,
      testimonialCount: 2,
    },
  ]);
  const [selectedTrack, setSelectedTrack] =
    useState<TrackWithTestimonialCountType>(tracks[0]);

  return (
    <TestimonialsFilterBar
      searchQuery={query}
      onSearchQueryChange={setQuery}
      selectedSortSlug={sortSlug}
      onSortSlugChange={setSortSlug}
      tracks={tracks}
      selectedTrack={selectedTrack}
      onTracksChange={setSelectedTrack}
    />
  );
};

describe("renders FilterBar component", () => {
  const user = userEvent.setup();

  it("renders all children components", () => {
    render(<Wrapper />);

    expect(screen.getAllByRole("button").length).toBe(2);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("tracks dropdown", async () => {
    render(<Wrapper />);

    let [tracksBtn, sortBtn] = screen.getAllByRole("button");
    let tracksImg = screen.getByRole("img", { name: "test1" });
    const searchInput = screen.getByRole("textbox");

    expect(tracksImg.getAttribute("alt")).toBe("test1");
    expect(sortBtn).toHaveTextContent("Sort by Most Recent");
    expect(searchInput.textContent).toEqual("");

    await user.click(tracksBtn);
    const dropdownElems = screen.getAllByRole("listitem");
    expect(dropdownElems.length).toBe(2);

    await user.click(dropdownElems[1]);
    tracksImg = screen.getByRole("img", { name: "test2" });
    [tracksBtn, sortBtn] = screen.getAllByRole("button");
    expect(tracksImg.getAttribute("alt")).toBe("test2");
  });

  it("sort dropdown", async () => {
    render(<Wrapper />);

    expect(screen.getAllByRole("button").length).toBe(2);
    let sortBtn = screen.getAllByRole("button")[1];
    expect(sortBtn.textContent).toEqual("Sort by Most Recent");

    await user.click(sortBtn);
    const dropdownList = screen.getAllByRole("list");
    expect(dropdownList.length).toBe(1);
    const dropdownElems = screen.getAllByRole("listitem");
    expect(dropdownElems.length).toBe(2);

    await user.click(dropdownElems[1]);
    sortBtn = screen.getAllByRole("button")[1];
    expect(sortBtn.textContent).toEqual("Sort by Oldest First");
  });

  it("exercise search filter", async () => {
    render(<Wrapper />);

    expect(screen.getByRole("textbox")).toBeTruthy();
    let searchInput: HTMLInputElement = screen.getByRole("textbox");
    expect(searchInput.placeholder).toEqual("Filter by exercise title");

    await user.type(searchInput, "exercise1");
    searchInput = screen.getByRole("textbox");
    expect(searchInput.value).toEqual("exercise1");
  });
});
