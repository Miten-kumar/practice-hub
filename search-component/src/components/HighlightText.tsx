import { highlightMatch } from "../utils/highlightMatch";

export const HighlightText = ({ text, query }: any) => {
  const parts = highlightMatch(text, query);

  return (
    <>
      {parts.map((part, i) =>
        i === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
};