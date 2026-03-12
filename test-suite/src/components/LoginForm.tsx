import React, { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [data, setData] = useState<FormData>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!data.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      {errors.email && <p>{errors.email}</p>}

      <input
        placeholder="password"
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      {errors.password && <p>{errors.password}</p>}

      <button type="submit">Login</button>
    </form>
  );
}