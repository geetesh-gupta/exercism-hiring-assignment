import Badge from "./Badge";

export enum IconSizes {
  xs = "w-4",
  sm = "w-8",
  md = "w-12",
  lg = "w-16",
  xl = "w-20",
}

type IconProps = {
  src: string;
  alt: string;
  rounded?: boolean;
  size?: IconSizes;
};

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  rounded = false,
  size = IconSizes.md,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${size} flex-shrink-0 text-labelSecondary ${
        rounded ? "rounded-full" : ""
      }`}
    />
  );
};

export enum IconBadgeType {
  dot,
  number,
}

export const IconWithBadge: React.FC<IconProps> = ({
  src,
  alt,
  rounded = false,
  size = IconSizes.md,
}) => {
  return (
    <Badge>
      <Icon size={size} src={src} alt={alt} rounded={rounded} />
    </Badge>
  );
};

export default Icon;
