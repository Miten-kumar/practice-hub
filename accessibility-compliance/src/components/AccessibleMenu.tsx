import { useState } from "react";

const items = ["Profile", "Settings", "Logout"];

export const AccessibleMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuStyle = {
    listStyle: "none",
    padding: "0.5rem",
    margin: 0,
    border: "1px solid #d0d7de",
    borderRadius: "8px",
    backgroundColor: "#fff",
    maxWidth: "14rem",
  } satisfies React.CSSProperties;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    }

    if (e.key === "Enter") {
      alert(items[activeIndex]);
    }
  };

  return (
    <ul role="menu" onKeyDown={handleKeyDown} style={menuStyle}>
      {items.map((item, index) => (
        <li
          key={item}
          role="menuitem"
          tabIndex={0}
          aria-selected={index === activeIndex}
          style={{
            padding: "0.65rem 0.75rem",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor: index === activeIndex ? "#eef4f8" : "transparent",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
