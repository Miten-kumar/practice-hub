import { forwardRef, useState } from "react";

type InputProps<T> = {
  label?: string;

  value: T;

  onChange: (value: T) => void;

  validate?: (value: T) => string | undefined;

  parse?: (value: string) => T;

  error?: string;

  type?: string;

  disabled?: boolean;

  required?: boolean;

  placeholder?: string;

  name?: string;
};

function InnerInput<T>(
  { label, value, onChange, validate, error, parse, ...rest }: InputProps<T>,

  ref: React.Ref<HTMLInputElement>,
) {
  const [internalError, setInternalError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    const newValue = parse ? parse(raw) : (raw as unknown as T);

    onChange(newValue);

    if (validate) {
      setInternalError(validate(newValue));
    }
  };

  const finalError = error || internalError;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <label>{label}</label>}
      <input
        ref={ref}
        value={String(value)}
        onChange={handleChange}
        {...rest}
      />
      {finalError && <div style={{ color: "red" }}>{finalError}</div>}
    </div>
  );
}

const Input = forwardRef(InnerInput) as <T>(
  props: InputProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => ReturnType<typeof InnerInput>;

export default Input;