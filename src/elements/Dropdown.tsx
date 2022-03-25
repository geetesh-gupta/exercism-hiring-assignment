import React, { MouseEventHandler, ReactElement } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import chevronDown from "../assets/images/chevronDown.svg";
import loaderLogo from "../assets/images/loader.svg";

export const Dropdown: React.FC<{
  selected?: { icon_url?: string; title: string };
  showLogo?: boolean;
  children: DropdownListItemType;
  className?: string;
  listClassName?: string;
}> = ({ selected, showLogo, children, className = "", listClassName = "" }) =>
  selected ? (
    <div className={"group inline-block relative " + className}>
      <button className="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <>
          <span className="mr-3">
            {showLogo && selected.icon_url ? (
              <Logo src={selected.icon_url} alt={selected.title} />
            ) : (
              <p>{selected.title}</p>
            )}
          </span>
          <Icon src={chevronDown} alt={"Open dropdown icon"} />
        </>
      </button>
      <DropdownList className={listClassName}>{children}</DropdownList>
    </div>
  ) : (
    <Logo src={loaderLogo} alt="Loading dropdown items" />
  );

export const DropdownList: React.FC<{
  children: DropdownListItemType;
  className?: string;
}> = ({ children, className = "" }) => (
  <ul
    role="list"
    className={
      "group-hover:block absolute hidden text-gray-700 rounded min-w-max bg-white p-2 pointer z-20 drop-shadow-md " +
      className
    }
  >
    {children}
  </ul>
);

type DropdownListItemType =
  | ReactElement<DropdownListItemProps>
  | Array<ReactElement<DropdownListItemProps>>;

type DropdownListItemProps = {
  onClick: MouseEventHandler<HTMLLIElement>;
};

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  children,
  onClick,
}) => (
  <li
    className="bg-white hover:bg-gray-200 py-2 px-6 flex whitespace-no-wrap items-center text-left cursor-pointer"
    onClick={onClick}
  >
    {children}
  </li>
);

export default Dropdown;
