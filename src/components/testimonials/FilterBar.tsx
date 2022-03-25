import Search from "../../elements/Search";
import { camelize } from "../../utils/stringUtils";
import TracksDropdown, { TracksDropdownProps } from "./TracksDropdown";
import { SortType } from "../../types/testimonials";

type TestimonialsFilterBarProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedSortType: SortType;
  onSortTypeChange: (sortType: SortType) => void;
} & TracksDropdownProps;

const TestimonialsFilterBar: React.FC<TestimonialsFilterBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  selectedSortType,
  onSortTypeChange,
  tracks,
  selectedTrack,
  onTracksChange,
}) => {
  return (
    <div className="flex text-gray-700 items-center w-full justify-between py-2 px-4">
      <div className="flex items-center">
        <div>
          <TracksDropdown
            tracks={tracks}
            selectedTrack={selectedTrack}
            onTracksChange={onTracksChange}
          />
        </div>
        <Search
          value={searchQuery}
          onChange={onSearchQueryChange}
          placeholder={"Filter by exercise title"}
        />
      </div>
      <select
        className=" bg-gray-200 rounded px-4 h-10 w-72 text-sm hover:bg-white border-2"
        value={selectedSortType}
        onChange={(e) => {
          onSortTypeChange(
            SortType[camelize(e.target.value) as keyof typeof SortType]
          );
        }}
        title="Select sorting order"
      >
        <option value={SortType.newest_first}>Sort by Most Recent</option>
        <option value={SortType.oldest_first}>Sort by Oldest First</option>
      </select>
    </div>
  );
};

export default TestimonialsFilterBar;
