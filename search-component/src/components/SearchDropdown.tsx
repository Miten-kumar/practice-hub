import { SearchItem } from "./SearchItem";

export const SearchDropdown = ({
  data,
  query,
  activeIndex,
  setActiveIndex,
}: any) => {
  if (!data.length) return null;

  return (
    <div style={{ border: "1px solid #ccc"}}>
      {data.map((item: any, index: number) => (
        <SearchItem
          key={index}
          item={item}
          query={query}
          isActive={index === activeIndex}
          onClick={() => alert(item)}
        />
      ))}
    </div>
  );
};
