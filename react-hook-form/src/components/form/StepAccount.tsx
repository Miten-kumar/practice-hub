import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema, type AccountInfo } from "../schemas/accountSchema";
import { useFormPersistence } from "../hooks/useFormPersistence";
import { getPasswordStrength } from "../utils/validationHelpers";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const StepAccount = ({ onNext, onPrev }: Props) => {
  const { load, save } = useFormPersistence<AccountInfo>("accountData");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<AccountInfo>({
    mode: "all",
    defaultValues: load(),
    resolver: zodResolver(AccountSchema),
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const strength = getPasswordStrength(password);
  const strengthColor = { weak: "red", medium: "orange", strong: "green" }[strength];

  const onSubmit = (data: AccountInfo) => {
    save(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Account Setup</legend>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("username")}
            aria-invalid={!!errors.username}
            aria-describedby="username-error"
          />
          <span id="username-error" role="alert">{errors.username?.message}</span>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby="password-error password-strength"
          />
          <span id="password-strength" aria-live="polite" style={{ color: strengthColor }}>
            {password ? `Strength: ${strength}` : ""}
          </span>
          <span id="password-error" role="alert">{errors.password?.message}</span>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby="confirm-error"
          />
          <span id="confirm-error" role="alert">{errors.confirmPassword?.message}</span>
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            {...register("role")}
            aria-invalid={!!errors.role}
            aria-describedby="role-error"
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <span id="role-error" role="alert">{errors.role?.message}</span>
        </div>
      </fieldset>

      <button type="button" onClick={onPrev}>Back</button>
      <button type="submit" disabled={isSubmitting}>Next</button>
    </form>
  );
};

export default StepAccount;