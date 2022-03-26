type IconType = {
  src: string;
  alt: string;
};

const Icon: React.FC<IconType> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-4 text-labelSecondary" />;
};

export default Icon;
