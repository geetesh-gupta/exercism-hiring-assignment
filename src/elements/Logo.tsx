type LogoType = {
  src: string;
  alt: string;
};

const Logo: React.FC<LogoType> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="w-12 rounded-full flex-shrink-0" />
  );
};

export default Logo;
