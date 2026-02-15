import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Checkbox from "../components/Checkbox";

interface User {
  name: string;
  country: string;
  accept: boolean;
}

export const Form_task = () => {
  const [user, setUser] = useState<User>({
    name: "",
    country: "",
    accept: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setUser((prev) => ({ ...prev, [name]: isChecked }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        label="Name"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />

      <Select
        label="Country"
        name="country"
        value={user.country}
        options={[
          { value: "india", label: "India" },
          { value: "usa", label: "USA" },
          { value: "uk", label: "UK" },
        ]}
        onChange={handleInputChange}
      />

      <Checkbox
        label="I accept"
        name="accept"
        checked={user.accept}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
