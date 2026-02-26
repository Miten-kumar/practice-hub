interface CounterProps {
  count: number;
}

const Counter: React.FC<{ count: number }> = ({ count }: CounterProps) => {
  return (
    <div>
      <h2>Counter: {count}</h2>
    </div>
  );
};

export default Counter;
