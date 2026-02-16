import type { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, value, onChange }: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;