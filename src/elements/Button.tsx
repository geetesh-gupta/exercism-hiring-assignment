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
    className="flex items-center rounded border-2 border-button bg-default p-md text-labelSecondary shadow-button disabled:border-0 disabled:bg-disabled disabled:text-labelTertiary"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);

export default Button;
