interface InputProps {
  className?: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const Input = ({
  className,
  label,
  value,
  placeholder = "",
  onChange,
  icon,
}: InputProps) => {
  return (
    <div className={`input-box ${className}`}>
      <label className="input-label">{label}</label>
      {icon && <span className="icon-box">{icon}</span>}
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
