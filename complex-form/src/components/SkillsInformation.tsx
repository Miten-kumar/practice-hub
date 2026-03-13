import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export default function SkillsInformation() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const primarySkill = useWatch({ control, name: "primarySkill" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technicalSkills",
  });

  return (
    <div>
      <h2>Skills</h2>

      <div>
        <div>Primary skill</div>
        {(
          [
            "Frontend",
            "Backend",
            "Fullstack",
            "DevOps",
            "Data Science",
          ] as const
        ).map((value) => (
          <label key={value} style={{ display: "block" }}>
            <input {...register("primarySkill")} type="radio" value={value} />
            {value}
          </label>
        ))}
        {errors.primarySkill ? (
          <span>{String(errors.primarySkill.message)}</span>
        ) : null}
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Technical skills</div>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              {...register(`technicalSkills.${index}`)}
              placeholder="e.g. React"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append("")}
          style={{ marginTop: 8 }}
        >
          Add skill
        </button>
        {errors.technicalSkills ? (
          <div>
            <span>
              {String(errors.technicalSkills.message ?? "Invalid skills")}
            </span>
          </div>
        ) : null}
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          Experience
          <select {...register("experience")}>
            {(["0-1", "1-2", "2-4", "4-6", "6+"] as const).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        {errors.experience ? (
          <span>{String(errors.experience.message)}</span>
        ) : null}
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          GitHub profile (optional)
          <input
            {...register("githubProfile")}
            placeholder="https://github.com/you"
          />
        </label>
        {errors.githubProfile ? (
          <span>{String(errors.githubProfile.message)}</span>
        ) : null}
      </div>

      {primarySkill === "Frontend" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            Frontend framework
            <select {...register("frontendFramework")}>
              <option value="">Select</option>
              {(["React", "Vue", "Angular", "Svelte", "Other"] as const).map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ),
              )}
            </select>
          </label>
          {errors.frontendFramework ? (
            <span>{String(errors.frontendFramework.message)}</span>
          ) : null}

          <div style={{ marginTop: 12 }}>
            <label>
              If Other, specify
              <input
                {...register("frameworkOther")}
                placeholder="Framework name"
              />
            </label>
            {errors.frameworkOther ? (
              <span>{String(errors.frameworkOther.message)}</span>
            ) : null}
          </div>
        </div>
      ) : null}

      {primarySkill === "Backend" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            Backend language
            <input
              {...register("backendLanguage")}
              placeholder="e.g. Node.js, Java"
            />
          </label>
          {errors.backendLanguage ? (
            <span>{String(errors.backendLanguage.message)}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
