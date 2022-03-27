import searchIcon from "../assets/images/search.svg";
import Icon, { IconSizes } from "./Icon";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder }) => (
  <div className="relative text-labelSecondary focus-within:text-labelDefault">
    <span className="sr-only">{placeholder}</span>
    <span className="absolute inset-y-0 left-0 flex items-center pl-5">
      <Icon size={IconSizes.sm} src={searchIcon} alt={`${placeholder} icon`} />
    </span>
    <input
      type="text"
      name="Filter by Exercise"
      className="leading-mdtext-labelDefault min-w-max rounded-md bg-input py-3 pl-12 pr-5 text-lg font-normal placeholder:text-labelSecondary focus:border-1 focus:border-inputFocus focus:bg-inputFocus focus:shadow-input focus:outline-none lg:min-w-[360px]"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  </div>
);

export default Search;
