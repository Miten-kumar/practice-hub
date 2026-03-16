import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        marginTop: 32,
        padding: "16px",
        color: "#6b7280",
        fontSize: 12,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        Temporary footer — replace with your real layout later.
      </div>
    </footer>
  );
}
