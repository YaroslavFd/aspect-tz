interface SelectProps<T> {
  options: { id: T; name: string }[];
  selectedValue: T | undefined;
  onChange: (id: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Select = <T extends number | string>({
  options,
  selectedValue,
  onChange,
  label,
  disabled = false,
  icon,
  className = "",
}: SelectProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(typeof value === "string" ? Number(value) : value);
  };

  return (
    <div className={`select-box ${className}`}>
      <label className="label">{label}</label>
      {icon && <span className="icon-box">{icon}</span>}
      <select
        className="select"
        value={selectedValue ?? ""}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <option className="select-option" key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
