import { useForm } from "react-hook-form";
import {
  PersonalInfoSchema,
  type PersonalInfo,
} from "../schemas/personalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// Add to existing props interface:
interface Props { onNext: () => void }

// Change the component signature:
const StepPersonalInfo = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfo>({
    mode: "all",
    defaultValues: JSON.parse(localStorage.getItem("personalData") || "{}"),
    resolver: zodResolver(PersonalInfoSchema),
  });

  const onSubmit = (data: PersonalInfo) => {
    console.log(data);
    localStorage.setItem("personalData", JSON.stringify(data));
    onNext();
  };
  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <label htmlFor="first_name">First Name</label>
        <br />
        <input
          id="first_name"
          {...register("first_name")}
          aria-invalid={errors.first_name ? "true" : "false"}
        />
        <br />
        <span role="alert">{errors.first_name?.message}</span>
        <br />
        <br />
        <label htmlFor="last_name">Last Name</label>
        <br />
        <input
          id="last_name"
          {...register("last_name")}
          aria-invalid={errors.last_name ? "true" : "false"}
        />
        <br />
        <span role="alert">{errors.last_name?.message}</span>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          {...register("email")}
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
        />
        <br />
        <span role="alert">{errors.email?.message}</span>
        <br />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          id="phone"
          {...register("phone")}
          type="tel"
          aria-invalid={errors.phone ? "true" : "false"}
        />
        <br />
        <span role="alert">{errors.phone?.message}</span>
        <br />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </>
  );
};

export default StepPersonalInfo;
