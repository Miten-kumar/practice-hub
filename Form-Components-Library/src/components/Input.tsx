import React from "react";

export type InputType = "text" | "number" | "email" | "password";

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

export interface InputProps<
  T extends string | number,
> extends BaseFieldProps<T> {
  type: InputType;
  placeholder?: string;
}

export function Input<T extends string | number>({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
  disabled = false,
  required = false,
  validator,
}: InputProps<T>) {
  const error = validator ? validator(value) : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;

    const parsedValue =
      type === "number" ? (Number(rawValue) as T) : (rawValue as T);

    onChange?.(parsedValue);
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={handleChange}
      />

      {error && (
        <span id={`${id}-error`} role="alert" className="form-error">
          {error}
        </span>
      )}
    </div>
  );
}
