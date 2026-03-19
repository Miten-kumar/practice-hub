import { useState } from "react";

export const useKeyboardNavigation = (length: number) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev <= 0 ? length - 1 : prev - 1));
    }
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
};