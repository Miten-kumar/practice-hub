import React, { useState } from "react";

interface Props {
  items: string[];
}

const SearchList: React.FC<Props> = ({ items }) => {
  const [query, setQuery] = useState<string>("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        aria-label="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {filtered.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchList;