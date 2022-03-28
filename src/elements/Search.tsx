import searchIcon from "../assets/images/search.svg";
import Icon, { IconSizes } from "./Icon";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  widthFull?: boolean;
};

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder,
  widthFull,
}) => (
  <div
    className={
      "relative flex text-labelSecondary focus-within:text-labelDefault" +
      (widthFull ? " w-full " : "")
    }
  >
    <span className="sr-only">{placeholder}</span>
    <span className="absolute inset-y-0 left-0 flex items-center pl-5">
      <Icon size={IconSizes.xs} src={searchIcon} alt={`${placeholder} icon`} />
    </span>
    <input
      type="text"
      name="Filter by Exercise"
      className={
        "min-w-max rounded-md bg-input py-3 pl-12 text-sm font-normal leading-md text-labelDefault placeholder:text-labelSecondary focus:border-1 focus:border-inputFocus focus:bg-inputFocus focus:shadow-input focus:outline-none md:pr-5 md:text-lg lg:min-w-[360px]" +
        (widthFull ? " w-full " : "")
      }
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  </div>
);

export default Search;
