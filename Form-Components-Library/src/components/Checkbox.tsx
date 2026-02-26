import React from "react";

export type Validator<T> = (value: T) => string | null;

interface BaseFieldProps<T> {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
  validator?: Validator<T>;
}

export interface CheckboxProps extends BaseFieldProps<boolean> {
  helperText?: string;
}

export function Checkbox({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  validator,
  helperText,
}: CheckboxProps) {
  const error = validator ? validator(value) : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={value}
        disabled={disabled}
        required={required}
        onChange={handleChange}
      />

      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {helperText && !error && (
        <span id={`${id}-helper`} className="form-helper">
          {helperText}
        </span>
      )}

      {error && (
        <span id={`${id}-error`} role="alert" className="form-error">
          {error}
        </span>
      )}
    </>
  );
}

export default Checkbox;
