import React, { MouseEventHandler, ReactElement } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import chevronDown from "../assets/images/chevronDown.svg";
import loaderLogo from "../assets/images/loader.svg";

export const Dropdown: React.FC<{
  selected?: { icon_url?: string; title: string };
  showLogo?: boolean;
  children: DropdownListItemType;
}> = ({ selected, showLogo, children }) =>
  selected ? (
    <div className="group inline-block relative">
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
          {/* <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg> */}
        </>
      </button>
      <DropdownList>{children}</DropdownList>
    </div>
  ) : (
    <Logo src={loaderLogo} alt="Loading dropdown items" />
  );

export const DropdownList: React.FC<{
  children: DropdownListItemType;
}> = ({ children }) => (
  <ul
    role="list"
    className="group-hover:block absolute hidden text-gray-700 rounded min-w-max bg-white p-2 pointer z-20 h-96 overflow-y-scroll drop-shadow-md"
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
    className="bg-white hover:bg-gray-200 py-2 px-6 flex whitespace-no-wrap items-center text-left pointer"
    onClick={onClick}
  >
    {children}
  </li>
);

export default Dropdown;
