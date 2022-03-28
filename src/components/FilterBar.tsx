import Search from "../elements/Search";
import TracksDropdown, { TracksDropdownProps } from "./TracksDropdown";
import { SortSlugEnum } from "../types/testimonials";
import Dropdown, { DropdownListItem } from "../elements/Dropdown";
import { getSortTypeBySlug, sortTypeValues } from "../utils/apiUtils";

type TestimonialsFilterBarProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedSortSlug: SortSlugEnum;
  onSortSlugChange: (sortType: SortSlugEnum) => void;
} & TracksDropdownProps;

const TestimonialsFilterBar: React.FC<TestimonialsFilterBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  selectedSortSlug,
  onSortSlugChange,
  tracks,
  selectedTrack,
  onTracksChange,
}) => {
  return (
    <div className="grid grid-cols-[max-content_1fr] grid-rows-2 items-center gap-y-2.5 p-lg md:grid-cols-[max-content_1fr_1fr] md:grid-rows-1 md:p-xl">
      {/* <div className="flex w-full items-center justify-center md:w-auto"> */}
      <TracksDropdown
        tracks={tracks}
        selectedTrack={selectedTrack}
        onTracksChange={onTracksChange}
      />
      <div className="col-span-2 row-start-2 w-full md:col-auto md:row-auto md:w-[min-content]">
        <Search
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder={"Filter by exercise title"}
          widthFull
        />
      </div>
      <div className="ml-auto">
        <Dropdown
          selected={{
            title: `Sort by ${
              getSortTypeBySlug(selectedSortSlug)?.title || ""
            }`,
          }}
          className="bg-default md:min-w-[280px]"
          widthFull
        >
          {sortTypeValues.map((sortType) => (
            <DropdownListItem
              key={sortType.slug}
              onClick={() => onSortSlugChange(sortType.slug)}
            >
              {sortType.title}
            </DropdownListItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default TestimonialsFilterBar;
