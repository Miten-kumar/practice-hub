import { useEffect, useState } from "react";
import { retryRequest } from "../utils/retryHandler";

interface User {
  name: string;
  age: number;
  id: number;
}
async function fetchUsers() {
  const res = await fetch("/api/users");

  if (!res.ok) {
  if (res.status >= 500) {
    throw new Error("Server error");
  }

  if (res.status === 404) {
    throw new Error("Users not found");
  }

  throw new Error("API error");
}

  return res.json();
}
export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await retryRequest(fetchUsers);
        setUsers(data);
      } catch(err) {
        setError(true);
        console.error(err)
      }
    }

    loadUsers();
  }, []);

  if (error) {
    return <p>Failed to load after 3 tries</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
