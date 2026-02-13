interface InputProps {
  value: string;
  type: 'text' | 'password' | 'email';
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ value, type, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;