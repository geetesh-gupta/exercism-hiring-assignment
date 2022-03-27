const BorderGradient: React.FC<{
  children: JSX.Element;
  rounded?: boolean;
}> = ({ children, rounded = false }) => {
  return (
    <div
      className={`h-full w-full bg-gradient-to-r from-[#cc00ff] to-[#3300ff] p-1 ${
        rounded ? "rounded-full" : ""
      }`}
    >
      <div className={`h-full ${rounded ? "rounded-full" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default BorderGradient;
