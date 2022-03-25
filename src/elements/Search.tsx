import searchIcon from "../assets/images/search.svg";
import Icon from "./Icon";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder }) => (
  <label className="relative block ">
    <span className="sr-only">{placeholder}</span>
    <div className="absolute top-3 left-3 items-center">
      <Icon src={searchIcon} alt={`${placeholder} icon`} />
    </div>
    <input
      className="placeholder:italic placeholder:text-slate-400 block bg-gray-200 hover:bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      name="search"
    />
  </label>
);

export default Search;
