import { useState } from "react";
import Input from "./components/Input";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";

function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [alive, setAlive] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setEmail(value);
  };

  const handlepasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSelectChange = (value: string) => {
    setRole(value);
    console.log(value);
  };
  const roles = ["admin", "user", "guest"];

  const handleCheckboxChange = (checked: boolean) => {
    setAlive(checked);
    console.log(`is alive ${checked}`);
  };

  return (
    <>
      <div>fvvfghdb</div>
      <Input<string> value={email} type="email" onChange={handleInputChange} />
      <Input<string>
        value={password}
        type="password"
        onChange={handlepasswordChange}
      />

      <Select
        onChange={handleSelectChange}
        options={roles.map((role) => ({ label: role, value: role }))}
        value={role}
        key={"select"}
      />

      <Checkbox<boolean>
        checkedValue={true}
        onChange={handleCheckboxChange}
        value={alive}
        label="Alive"
        uncheckedValue={false}
      />

      {email && <p>Your email is: {email}</p>}
      {password && <p>Your password is: {password}</p>}
      {role && <p>Your role is: {role}</p>}
      {alive && <p>You are alive</p>}
    </>
  );
}

export default App;
