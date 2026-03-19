import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchService } from "../services/searchService";
import { SearchDropdown } from "../components/SearchDropdown";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

export const AutoSearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedValue = useDebounce(query, 200);

  const cacheRef = useRef(new Map<string, string[]>());
  const controllerRef = useRef<AbortController | null>(null);

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setData([]);
      return;
    }
    if (cacheRef.current.has(q)) {
      setData(cacheRef.current.get(q) || []);
      return;
    }
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError("");
    try {
      const res = await searchService(q, controller.signal);
      cacheRef.current.set(q, res);
      setData(res);
    } catch (error: any) {
      if (error.name === "AbortError") return;
      console.error(error.name);
      setError("something was wrong");
    } finally {
      setLoading(false);
    }
  }, []);
  const { activeIndex, setActiveIndex, handleKeyDown } = useKeyboardNavigation(
    data.length,
  );
  useEffect(() => {
    fetchResults(debouncedValue);
  }, [debouncedValue, fetchResults]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ width: "100%", padding: "6px" }}
        onKeyDown={handleKeyDown}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && data.length === 0 && query && <div>No results</div>}
      <SearchDropdown
        data={data}
        query={query}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
};
