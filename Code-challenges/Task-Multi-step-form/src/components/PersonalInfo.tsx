import { useFormContext } from "react-hook-form";
import type { FormValues } from "../schemas/fromSchema";

export default function PersonalInfo() {

  const {
    register,
    formState: { errors }
  } = useFormContext<FormValues>();

  const firstNameError = errors.firstName?.message;
  const lastNameError = errors.lastName?.message;
  const emailError = errors.email?.message;

  return (
    <div>

      <h2>Personal Information</h2>

      <label>First Name</label>
      <input {...register("firstName")} />
      <p>{typeof firstNameError === "string" ? firstNameError : ""}</p>

      <label>Last Name</label>
      <input {...register("lastName")} />
      <p>{typeof lastNameError === "string" ? lastNameError : ""}</p>

      <label>Email</label>
      <input {...register("email")} />
      <p>{typeof emailError === "string" ? emailError : ""}</p>

    </div>
  );
}
