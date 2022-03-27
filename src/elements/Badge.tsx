export enum BadgeSizes {
  md = "md",
  lg = "lg",
}

const Badge: React.FC<{
  size?: BadgeSizes;
}> = ({ size = BadgeSizes.md, children }) => {
  const containerClasses =
    size === BadgeSizes.md ? "top-1 right-1" : "top-2 right-2";
  const badgeClasses =
    size === BadgeSizes.md
      ? "h-3 w-3 top-[calc(50%_-_0.25rem)] left-[calc(50%_-_0.25rem)]"
      : "h-5 w-5 top-[calc(50%_-_0.5rem)] left-[calc(50%_-_0.5rem)]";

  return (
    <div className="relative">
      {children}
      <div className={`absolute rounded-full bg-default ${containerClasses}`}>
        <div
          className={`absolute rounded-full border-2 border-white bg-alert ${badgeClasses}`}
        ></div>
      </div>
    </div>
  );
};

export const BadgeWithNum: React.FC<{
  badgeCount: number;
}> = ({ badgeCount, children }) => {
  return (
    <div className="relative">
      {children}
      <div
        className={`absolute top-[-0.75rem] right-[-0.75rem] rounded-full bg-default`}
      >
        <div className={`h-6 w-6 rounded-full bg-alert text-xs text-contrast`}>
          {badgeCount ? badgeCount : ""}
        </div>
      </div>
    </div>
  );
};

export default Badge;
