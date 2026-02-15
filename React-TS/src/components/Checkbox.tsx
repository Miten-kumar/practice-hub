import type { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, name, checked, onChange }: CheckboxProps) => {
  return (
    <div className="checkbox-group">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;