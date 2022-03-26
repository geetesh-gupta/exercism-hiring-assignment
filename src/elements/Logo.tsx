type LogoType = {
  src: string;
  alt: string;
  rounded?: boolean;
};

const Logo: React.FC<LogoType> = ({ src, alt, rounded = false }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-12 flex-shrink-0 ${rounded ? "rounded-full" : ""}`}
    />
  );
};

export default Logo;
