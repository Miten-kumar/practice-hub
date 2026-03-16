import React, { useEffect, useState } from "react";
import api from '../utils/GlobalErrorHandler'

interface User {
  id: number;
  username: string;
  email:string;
  password:string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>("https://fakestoreapi.com/users");
        setUsers(response.data);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) 
    throw new Error(error)
  if (users.length === 0) return <p>No users found</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

export default UserList;