type ButtonType = {
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonType> = ({
  children,
  onClick,
  disabled = false,
}) => (
  <button
    className="bg-white py-2 px-4 rounded flex items-center border-2 border-gray-200 hover:bg-gray-100 drop-shadow-md disabled:bg-gray-300 "
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
