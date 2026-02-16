import { useState } from "react";

import { Input } from "./components/Input";
import Checkbox from "./components/Checkbox";
import Select from "./components/Select";

function App() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("IN");

  return (
    <>
      <div>
        <Input
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={setName}
        />

        <Input
          id="age"
          label="Age"
          type="number"
          value={age}
          onChange={setAge}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <Checkbox
          id="subscribe"
          label="Subscribe to newsletter"
          value={subscribe}
          onChange={setSubscribe}
        />

        <Select
          id="country"
          label="Country"
          value={country}
          onChange={setCountry}
          options={[
            { label: "India", value: "IN" },
            { label: "United States", value: "US" },
            { label: "Canada", value: "CA" },
            { label: "United Kingdom", value: "UK" },
          ]}
        />
      </div>
    </>
  );
}

export default App;
