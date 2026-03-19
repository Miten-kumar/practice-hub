export const highlightMatch = (text: string, query: string) => {
  const index = text.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) return [text];

  return [
    text.slice(0, index),
    text.slice(index, index + query.length),
    text.slice(index + query.length),
  ];
};