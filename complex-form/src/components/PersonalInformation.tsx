import { useFormContext } from "react-hook-form";

export default function PersonalInformation() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h2>Personal Detailes</h2>
      <label htmlFor="firstName">First Name: </label>
      <input
        {...register("firstName", { required: "First Name is required" })}
      />
      {errors.firstName ? <span>{String(errors.firstName.message ?? "Required")}</span> : null}
      <br />

      <label htmlFor="lastName">Last Name: </label>
      <input {...register("lastName", { required: "Last Name is required" })} />
      {errors.lastName ? <span>{String(errors.lastName.message ?? "Required")}</span> : null}
      <br />

      <label htmlFor="email">Email: </label>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email ? <span>{String(errors.email.message ?? "Required")}</span> : null}
      <br />

      <label htmlFor="age">Age: </label>
      <input
        {...register("age", { required: "age is required", valueAsNumber: true })}
        type="number"
      />
      {errors.age ? <span>{String(errors.age.message ?? "Required")}</span> : null}
    </div>
  );
}
