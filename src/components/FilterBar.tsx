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
    <div className="flex w-full flex-col items-center justify-center gap-2 p-md md:w-auto md:flex-row md:justify-between md:p-xl">
      <div className="flex w-full items-center justify-center md:w-auto">
        <TracksDropdown
          tracks={tracks}
          selectedTrack={selectedTrack}
          onTracksChange={onTracksChange}
        />
        <Search
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder={"Filter by exercise title"}
        />
      </div>
      <div className="w-full md:ml-auto md:w-auto">
        <Dropdown
          selected={{
            title: `Sort by ${
              getSortTypeBySlug(selectedSortSlug)?.title || ""
            }`,
          }}
          className="w-full bg-default md:min-w-[280px]"
          listClassName="w-full"
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
