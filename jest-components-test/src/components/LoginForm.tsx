import React, { useState } from "react";
import { loginUser } from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password too short");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await loginUser({ email, password });
    } catch {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}
