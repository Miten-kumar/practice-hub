interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  value: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange , value }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label>{value}</label>
    </>
  );
};

export default Checkbox;
