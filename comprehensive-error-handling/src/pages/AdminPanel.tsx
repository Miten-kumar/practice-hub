import { type ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function isAuthed(): boolean {
  return localStorage.getItem("demo_auth") === "1";
}

export default function AdminPanel(): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthed()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ margin: "0 0 12px" }}>Admin Panel</h1>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
          background: "white",
        }}
      >
        <div>
          <p style={{ margin: 0, color: "#374151" }}>
            Temporary admin screen — replace with real management UI later.
          </p>
          <ul style={{ margin: "10px 0 0", color: "#374151" }}>
            <li>View system status</li>
            <li>Manage users</li>
            <li>Audit logs</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
