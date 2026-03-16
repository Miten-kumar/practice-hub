import { type CSSProperties, type ReactElement } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(): ReactElement {
  const linkStyle = ({ isActive }: { isActive: boolean }): CSSProperties => ({
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: isActive ? "#111827" : "#374151",
    background: isActive ? "#eef2ff" : "transparent",
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "white",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ fontWeight: 700 }}>Comprehensive Error Handling</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <NavLink to="/" end style={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" style={linkStyle}>
            Profile
          </NavLink>
          <NavLink to="/admin" style={linkStyle}>
            Admin
          </NavLink>
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
