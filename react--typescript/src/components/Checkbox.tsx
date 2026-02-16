import React, { forwardRef, useState } from "react";

type CheckboxProps<T> = {
  label?: string;

  value: T;

  checkedValue: T;

  uncheckedValue: T;

  onChange: (value: T) => void;

  validate?: (value: T) => string | undefined;

  error?: string;
};

function InnerCheckbox<T>(
  {
    label,

    value,

    checkedValue,

    uncheckedValue,

    onChange,

    validate,

    error,
  }: CheckboxProps<T>,

  ref: React.Ref<HTMLInputElement>,
) {
  const [internalError, setInternalError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? checkedValue : uncheckedValue;

    onChange(newValue);

    if (validate) {
      setInternalError(validate(newValue));
    }
  };

  const finalError = error || internalError;

  return (
    <div>
      <label>
        <input
          ref={ref}
          type="checkbox"
          checked={value === checkedValue}
          onChange={handleChange}
        />
        {label}
      </label>
      {finalError && <div style={{ color: "red" }}>{finalError}</div>}
    </div>
  );
}

const Checkbox = forwardRef(InnerCheckbox) as <T>(
  props: CheckboxProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => ReturnType<typeof InnerCheckbox>;

export default Checkbox;
