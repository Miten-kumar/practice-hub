import { useFormContext, useFieldArray } from "react-hook-form";
import type { FormValues } from "../schemas/fromSchema";

export default function Employment() {

  const { register, control, watch } = useFormContext<FormValues>();

  const employmentStatus = watch("employmentStatus");

  const { fields, append, remove } = useFieldArray<FormValues, "skills">({
    control,
    name: "skills"
  });

  return (
    <div>

      <h2>Employment</h2>

      <label>Status</label>

      <select {...register("employmentStatus")}>
        <option value="employed">Employed</option>
        <option value="unemployed">Unemployed</option>
      </select>

      {employmentStatus === "employed" && (
        <input
          {...register("companyName")}
          placeholder="Company Name"
        />
      )}

      <h3>Skills</h3>

      {fields.map((field, index) => (
        <div key={field.id}>

          <input {...register(`skills.${index}` as const)} />

          <button
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </button>

        </div>
      ))}

      <button
        type="button"
        onClick={() => append("")}
      >
        Add Skill
      </button>

    </div>
  );
}
