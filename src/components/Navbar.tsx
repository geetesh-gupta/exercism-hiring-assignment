import { useRef, useState } from "react";
import Icon, { IconSizes, IconWithBadge } from "../elements/Icon";
import exercismLogo from "../assets/images/exercismLogo.svg";
import dashboardLogo from "../assets/images/nav/dashboard.svg";
import tracksLogo from "../assets/images/nav/tracks.svg";
import mentoringLogo from "../assets/images/nav/mentoring.svg";
import contributeLogo from "../assets/images/nav/contribute.svg";
import moodLogo from "../assets/images/nav/mood.svg";
import indicatorLogo from "../assets/images/nav/indicator.svg";
import notificationsLogo from "../assets/images/nav/notifications.svg";
import badgeLogo from "../assets/images/nav/badge.svg";
import navMenuLogo from "../assets/images/nav/navMenu.svg";
import avatarLogo from "../assets/images/nav/avatar.svg";
import Badge, { BadgeSizes, BadgeWithNum } from "../elements/Badge";
import BorderGradient from "../elements/BorderGradient";
import { DropdownList, DropdownListItem } from "../elements/Dropdown";
import useOnClickOutside from "../hooks/useOnClickOutside";

const basicNavToggleItems = [
  {
    title: "Public Profile",
    textColor: "text-labelSecondary",
  },
  {
    title: "Your Journey",
    textColor: "text-labelSecondary",
  },
  {
    title: "Settings",
    textColor: "text-labelSecondary",
  },
  {
    title: "Sign out",
    textColor: "text-labelSecondary",
  },
];

const leftNavItems = [
  {
    icon: tracksLogo,
    title: "Tracks",
  },
  {
    icon: mentoringLogo,
    title: "Mentoring",
  },
  {
    icon: contributeLogo,
    title: "Contribute",
  },
];

const LeftNavItems = () => {
  return (
    <ul className="flex flex-row items-center gap-8">
      <li key={"Dashboard"}>
        <a href="/" className={"flex items-center gap-4 text-labelDefault"}>
          <Icon
            size={IconSizes.md}
            src={dashboardLogo}
            alt={`${"Dashboard"} Logo`}
          />
          {"Dashboard"}
        </a>
      </li>
      {leftNavItems.map((navItem) => (
        <li key={navItem.title}>
          <a href="/" className={"flex items-center gap-4 text-labelSecondary"}>
            <Icon
              size={IconSizes.sm}
              src={navItem.icon}
              alt={`${navItem.title} Logo`}
            />
            {navItem.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const RightNavItems = () => {
  return (
    <ul className="flex flex-row items-center gap-8">
      <li>
        <a href="/" className="relative flex items-center gap-4">
          <IconWithBadge size={IconSizes.sm} src={moodLogo} alt={"Mood Logo"} />
        </a>
      </li>
      <li>
        <a href="/">
          <IconWithBadge
            size={IconSizes.sm}
            src={indicatorLogo}
            alt={"Indicator Logo"}
          />
        </a>
      </li>
      <li>
        <a href="/">
          <BadgeWithNum badgeCount={1}>
            <div className="rounded-xl bg-notification py-1 px-2 drop-shadow-notification">
              <Icon
                size={IconSizes.sm}
                src={notificationsLogo}
                alt={"Notifications Logo"}
              />
            </div>
          </BadgeWithNum>
        </a>
      </li>
      <li>
        <a href="/">
          <Badge size={BadgeSizes.lg}>
            <BorderGradient rounded>
              <button className="border-gradient-to-r flex items-center gap-2 rounded-full bg-labelDefault from-blue-600 to-purple-500 p-sm text-contrast">
                <Icon size={IconSizes.sm} src={badgeLogo} alt={"Badge Logo"} />
                <span className="text-lg font-semibold leading-xl">300K</span>
              </button>
            </BorderGradient>
          </Badge>
        </a>
      </li>
      <li>
        <a href="/">
          <Icon src={avatarLogo} alt={"Avatar Logo"} rounded />
        </a>
      </li>
    </ul>
  );
};

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useOnClickOutside(ref, () => setNavbarOpen(false));

  return (
    <nav className="relative flex w-full items-center gap-8 bg-default p-xl text-lg font-semibold leading-lg text-labelSecondary shadow">
      <a href="/">
        <img src={exercismLogo} alt={"Exercism Logo"} className="h-8" />
      </a>
      <div className="flex w-full">
        <div className="mr-auto hidden xl:flex">
          <LeftNavItems />
        </div>
        <div className="ml-auto hidden md:flex">
          <RightNavItems />
        </div>
      </div>
      <div className={"relative ml-auto inline-block items-center"} ref={ref}>
        <button
          className={`flex items-center justify-between rounded-md text-lg font-normal leading-md text-labelSecondary`}
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <Icon size={IconSizes.sm} src={navMenuLogo} alt={"Nav Menu Logo"} />
        </button>
        <div className={navbarOpen ? " flex flex-col" : " hidden"}>
          <DropdownList className="right-[calc(100%_-_2rem)] min-w-max text-labelSecondary">
            <>
              {basicNavToggleItems.map((navItem) => (
                <DropdownListItem key={navItem.title}>
                  <a href="/" className={"flex items-center gap-4 "}>
                    {navItem.title}
                  </a>
                </DropdownListItem>
              ))}
              <div className="block xl:hidden">
                <div className="my-3 h-px w-full bg-gray-100" />
                <DropdownListItem key={"Dashboard"}>
                  <a href="/" className={"flex items-center gap-4"}>
                    Dashboard
                  </a>
                </DropdownListItem>
                {leftNavItems.map((navItem) => (
                  <DropdownListItem key={navItem.title}>
                    <a href="/" className={"flex items-center gap-4 "}>
                      {navItem.title}
                    </a>
                  </DropdownListItem>
                ))}
              </div>
            </>
          </DropdownList>
        </div>
      </div>
    </nav>
  );
}
