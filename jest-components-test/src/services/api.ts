export interface User {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
}

export const loginUser = async (data: User) => {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login error");

  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch("/api/users");

  if (!res.ok) throw new Error("Fetch error");

  return res.json();
};
