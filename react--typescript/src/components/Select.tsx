interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}


export default Select;