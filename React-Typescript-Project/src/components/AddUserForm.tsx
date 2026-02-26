import { useState } from "react";
import User from "./User";

interface User {
  name: string;
  email: string;
}

const AddUserForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsers([...users, { name, email }]);
    setName("");
    setEmail("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {users.map((user, index) => (
          <User key={index} name={user.name} email={user.email} />
        ))}
      </div>
    </>
  );
};

export default AddUserForm;
