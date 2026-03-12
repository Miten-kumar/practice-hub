import { useEffect, useState } from "react";
import { fetchUsers, type User } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError("Failed to fetch"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (users.length === 0) return <p>No users found</p>;

  return (
    <ul>
      {users.map((u: User) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
