import type { ChangeEvent } from "react";

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ label, name, value, options, onChange }: SelectProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;