import { HighlightText } from "./HighlightText";

export const SearchItem = ({
  item,
  query,
  isActive,
  onClick,
}: any) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "8px",
        background: isActive ? "#eee" : "#fff",
        cursor: "pointer",
      }}
    >
      <HighlightText text={item} query={query} />
    </div>
  );
};