import { type ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type LoadState = "idle" | "loading" | "success" | "error";

type ProfileData = {
  name: string;
  email: string;
  plan: "Free" | "Pro";
};

function isAuthed(): boolean {
  return localStorage.getItem("demo_auth") === "1";
}

export default function Profile(): ReactElement {
  const [state, setState] = useState<LoadState>("idle");
  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authed = isAuthed();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!authed) return;
      setState("loading");
      setError(null);

      try {
        await new Promise((r) => setTimeout(r, 500));
        const shouldFail = Math.random() < 0.2;
        if (shouldFail) throw new Error("Temporary fetch failure. Try again.");

        const payload: ProfileData = { name: "Demo User", email: "demo@example.com", plan: "Free" };
        if (cancelled) return;
        setData(payload);
        setState("success");
      } catch (e) {
        if (cancelled) return;
        setData(null);
        setError(e instanceof Error ? e.message : "Unknown error");
        setState("error");
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [authed]);

  if (!authed) {
    return (
      <main style={{ maxWidth: 760, margin: "24px auto", padding: "0 16px" }}>
        <h1 style={{ margin: "0 0 12px" }}>Profile</h1>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
            background: "white",
          }}
        >
          <p style={{ margin: 0, color: "#374151" }}>
            You’re not logged in. This is a temporary auth gate.
          </p>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "#6b7280" }}>
            Go to <Link to="/login?redirect=/profile">Login</Link> and then return here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 760, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ margin: "0 0 12px" }}>Profile</h1>
      <p style={{ margin: "0 0 16px", color: "#6b7280" }}>
        Temporary profile screen with simulated loading + error.
      </p>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
          background: "white",
        }}
      >
        {state === "loading" ? <div>Loading…</div> : null}
        {state === "error" ? (
          <div role="alert" style={{ color: "#b91c1c" }}>
            {error}
          </div>
        ) : null}
        {state === "success" && data ? (
          <dl style={{ display: "grid", gridTemplateColumns: "140px 1fr", rowGap: 10, margin: 0 }}>
            <dt style={{ color: "#6b7280" }}>Name</dt>
            <dd style={{ margin: 0 }}>{data.name}</dd>
            <dt style={{ color: "#6b7280" }}>Email</dt>
            <dd style={{ margin: 0 }}>{data.email}</dd>
            <dt style={{ color: "#6b7280" }}>Plan</dt>
            <dd style={{ margin: 0 }}>{data.plan}</dd>
          </dl>
        ) : null}

        <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("demo_auth");
              window.location.reload();
            }}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Log out (demo)
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #4f46e5",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reload (retry)
          </button>
        </div>
      </div>
    </main>
  );
}
