import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useTrottle from "../hooks/useTrottle";

export default function Search() {
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query, 500);
  const throttledQuery = useTrottle(query, 1000);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Debounced Query: {debouncedQuery}</p>
      <p>Throttled Query: {throttledQuery}</p>
    </div>
  );
}
