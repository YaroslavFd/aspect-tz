interface ButtonProps {
  className?: string;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const CustomButton = ({
  className,
  label,
  onClick,
  disabled = false,
  icon,
  ...others
}: ButtonProps) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...others}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default CustomButton;
