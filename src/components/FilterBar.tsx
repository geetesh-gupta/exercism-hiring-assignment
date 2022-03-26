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
    <div className="flex text-gray-700 items-center w-full justify-between py-2 px-4">
      <div className="flex items-center">
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
      <Dropdown
        selected={{
          title: `Sort by ${getSortTypeBySlug(selectedSortSlug)?.title || ""}`,
        }}
        className="bg-gray-200 relative"
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
  );
};

export default TestimonialsFilterBar;