import { useEffect, useState, type ChangeEvent } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <input
      placeholder="Search..."
      value={query}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
    />
  );
}
