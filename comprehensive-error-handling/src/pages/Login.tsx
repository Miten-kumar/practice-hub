import type { FormEvent, ReactElement } from "react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type LoginState = "idle" | "submitting" | "error";

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("redirect") ?? "/";
  }, [location.search]);

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [state, setState] = useState<LoginState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setMessage(null);
    setState("submitting");

    await new Promise((r) => setTimeout(r, 450));

    if (!email.includes("@") || password.length < 4) {
      setState("error");
      setMessage("Enter a valid email and a password with 4+ characters.");
      return;
    }

    localStorage.setItem("demo_auth", "1");
    setState("idle");
    navigate(redirectTo);
  }

  return (
    <main style={{ maxWidth: 520, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ margin: "0 0 12px" }}>Login</h1>
      <p style={{ margin: "0 0 16px", color: "#6b7280" }}>
        Temporary login form (stores a demo auth flag in <code>localStorage</code>).
      </p>

      <form
        onSubmit={onSubmit}
        style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "white" }}
      >
        <label style={{ display: "block", fontSize: 12, color: "#374151" }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            style={{
              display: "block",
              width: "100%",
              marginTop: 6,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
        </label>

        <label style={{ display: "block", fontSize: 12, color: "#374151", marginTop: 12 }}>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            style={{
              display: "block",
              width: "100%",
              marginTop: 6,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
        </label>

        {message ? (
          <div
            role="alert"
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#7f1d1d",
              fontSize: 12,
            }}
          >
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={state === "submitting"}
          style={{
            marginTop: 14,
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #4f46e5",
            background: state === "submitting" ? "#e0e7ff" : "#4f46e5",
            color: state === "submitting" ? "#111827" : "white",
            cursor: state === "submitting" ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {state === "submitting" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
