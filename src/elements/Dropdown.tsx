import React, { MouseEventHandler, ReactElement } from "react";
import Icon, { IconSizes } from "./Icon";
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
    <div className={"group relative inline-block items-center"}>
      <button
        className={
          `flex items-center justify-between rounded-md text-lg font-normal leading-md text-labelSecondary ${
            showLogo && selected.icon_url ? "mr-6 " : " bg-input p-lg "
          }` + className
        }
      >
        <>
          <span className="mr-3.5">
            {showLogo && selected.icon_url ? (
              <Icon src={selected.icon_url} alt={selected.title} />
            ) : (
              <p>{selected.title}</p>
            )}
          </span>
          <Icon
            size={IconSizes.xs}
            src={chevronDown}
            alt={"Open dropdown icon"}
          />
        </>
      </button>
      <DropdownList className={listClassName}>{children}</DropdownList>
    </div>
  ) : (
    <Icon src={loaderLogo} alt="Loading dropdown items" />
  );

export const DropdownList: React.FC<{
  children: DropdownListItemType;
  className?: string;
}> = ({ children, className = "" }) => (
  <ul
    role="list"
    className={
      "pointer absolute z-20 hidden rounded-lg bg-default p-2 text-labelSecondary drop-shadow-lg group-hover:block " +
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
  className?: string;
};

export const DropdownListItem: React.FC<DropdownListItemProps> = ({
  children,
  onClick,
  className = "",
}) => (
  <li
    className={
      "whitespace-no-wrap flex cursor-pointer items-center bg-default py-2 px-6 text-left hover:bg-secondaryHover " +
      className
    }
    onClick={onClick}
  >
    {children}
  </li>
);

export default Dropdown;
