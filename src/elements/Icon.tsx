export enum IconSizes {
  sm = "w-4",
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

export default Icon;
