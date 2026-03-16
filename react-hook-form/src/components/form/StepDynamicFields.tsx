import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminFieldsSchema,
  UserFieldsSchema,
  type AdminFields,
  type UserFields,
} from "../schemas/dynamicSchema";
import { useFormPersistence } from "../hooks/useFormPersistence";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const INTERESTS = ["Technology", "Sports", "Music", "Travel", "Science"];

const StepDynamicFields = ({ onNext, onPrev }: Props) => {
  const accountData = JSON.parse(localStorage.getItem("accountData") || "{}");
  const isAdmin = accountData.role === "admin";

  if (isAdmin) return <AdminForm onNext={onNext} onPrev={onPrev} />;
  return <UserForm onNext={onNext} onPrev={onPrev} />;
};

const AdminForm = ({ onNext, onPrev }: Omit<Props, never>) => {
  const { load, save } = useFormPersistence<AdminFields>("dynamicData");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminFields>({
    mode: "all",
    defaultValues: load(),
    resolver: zodResolver(AdminFieldsSchema),
  });

  const onSubmit = (data: AdminFields) => { save(data); onNext(); };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>Admin Configuration</legend>

        <div>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            {...register("department")}
            aria-invalid={!!errors.department}
            aria-describedby="dept-error"
          />
          <span id="dept-error" role="alert">{errors.department?.message}</span>
        </div>

        <div>
          <label htmlFor="access_level">Access Level</label>
          <select
            id="access_level"
            {...register("access_level")}
            aria-invalid={!!errors.access_level}
            aria-describedby="access-error"
          >
            <option value="">Select level</option>
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="admin">Admin</option>
          </select>
          <span id="access-error" role="alert">{errors.access_level?.message}</span>
        </div>
      </fieldset>

      <button type="button" onClick={onPrev}>Back</button>
      <button type="submit" disabled={isSubmitting}>Next</button>
    </form>
  );
};

const UserForm = ({ onNext, onPrev }: Omit<Props, never>) => {
  const { load, save } = useFormPersistence<UserFields>("dynamicData");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFields>({
    mode: "all",
    defaultValues: { interests: [], ...load() },
    resolver: zodResolver(UserFieldsSchema),
  });

  const onSubmit = (data: UserFields) => { save(data); onNext(); };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>User Preferences</legend>

        <fieldset aria-describedby="interests-error">
          <legend>Interests (select at least one)</legend>
          {INTERESTS.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                {...register("interests")}
              />
              {interest}
            </label>
          ))}
          <span id="interests-error" role="alert">{errors.interests?.message}</span>
        </fieldset>

        <div>
          <label htmlFor="subscriptions">Subscription Plan</label>
          <select
            id="subscriptions"
            {...register("subscriptions")}
            aria-invalid={!!errors.subscriptions}
            aria-describedby="sub-error"
          >
            <option value="">Select a plan</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <span id="sub-error" role="alert">{errors.subscriptions?.message}</span>
        </div>
      </fieldset>

      <button type="button" onClick={onPrev}>Back</button>
      <button type="submit" disabled={isSubmitting}>Next</button>
    </form>
  );
};

export default StepDynamicFields;