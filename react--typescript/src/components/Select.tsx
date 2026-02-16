import React, { forwardRef, useState } from "react";

type Option<T> = {
  label: string;

  value: T;
};

type SelectProps<T> = {
  label?: string;

  value: T;

  options: Option<T>[];

  onChange: (value: T) => void;

  validate?: (value: T) => string | undefined;

  error?: string;
};

function InnerSelect<T>(
  { label, value, options, onChange, validate, error }: SelectProps<T>,

  ref: React.Ref<HTMLSelectElement>,
) {
  const [internalError, setInternalError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;

    const newValue = options[selectedIndex].value;

    onChange(newValue);

    if (validate) {
      setInternalError(validate(newValue));
    }
  };

  const finalError = error || internalError;

  return (
    <div>
      {label && <label>{label}</label>}
      <select ref={ref} value={String(value)} onChange={handleChange}>
        {options.map((o, i) => (
          <option key={i} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
      {finalError && <div style={{ color: "red" }}>{finalError}</div>}
    </div>
  );
}

const Select = forwardRef(InnerSelect) as <T>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> },
) => ReturnType<typeof InnerSelect>;

export default Select;