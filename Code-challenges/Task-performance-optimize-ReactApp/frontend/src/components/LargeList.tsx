
export const LargeList = () => {
  const items = new Array(100).fill(0);

  return (
    <div>
      {items.map((_, i) => (
        <div key={i}>Item {i}</div>
      ))}
    </div>
  );
};