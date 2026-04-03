import { useState } from "react";

export const LiveAnnouncer = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setMessage("Item added successfully")}
        style={{
          padding: "0.6rem 0.9rem",
          border: "1px solid #1f5f8b",
          borderRadius: "6px",
          backgroundColor: "#1f5f8b",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Add Item
      </button>

      <div
        aria-live="polite"
        style={{
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {message}
      </div>
    </>
  );
};
