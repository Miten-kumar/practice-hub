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

/**
 * Select option type
 */
export interface SelectOption<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Select-specific props
 */
export interface SelectProps<
  T extends string | number,
> extends BaseFieldProps<T> {
  options: SelectOption<T>[];
  placeholder?: string;
  helperText?: string;
}

/**
 * Reusable Select Component
 */
export function Select<T extends string | number>({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
  required = false,
  validator,
  placeholder,
  helperText,
}: SelectProps<T>) {
  const error = validator ? validator(value) : null;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const rawValue = e.target.value;
    const option = options.find((opt) => String(opt.value) === rawValue);

    if (option) {
      onChange(option.value as T);
    }
  }

  return (
    <div className="form-field select-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

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
    </div>
  );
}

export default Select;
