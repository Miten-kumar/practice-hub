import { useFormContext, useWatch } from "react-hook-form";

export default function Profetionalinformation() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const employmentStatus = useWatch({ control, name: "employmentStatus" });

  return (
    <div>
      <h2>Profetionalinformation</h2>

      <div>
        <div>Employment status</div>
        {(["Student", "Employed", "Freelancer", "Unemployed"] as const).map((value) => (
          <label key={value} style={{ display: "block" }}>
            <input {...register("employmentStatus")} type="radio" value={value} />
            {value}
          </label>
        ))}
        {errors.employmentStatus ? (
          <span>{String(errors.employmentStatus.message)}</span>
        ) : null}
      </div>

      {employmentStatus === "Student" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            College name
            <input {...register("collegeName")} />
          </label>
          {errors.collegeName ? <span>{String(errors.collegeName.message)}</span> : null}

          <div style={{ marginTop: 12 }}>
            <label>
              Degree
              <select {...register("degree")}>
                <option value="">Select</option>
                {(["Bachelors", "Masters", "PhD", "Diploma", "Other"] as const).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            {errors.degree ? <span>{String(errors.degree.message)}</span> : null}
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              If Other, specify
              <input {...register("degreeOther")} />
            </label>
            {errors.degreeOther ? <span>{String(errors.degreeOther.message)}</span> : null}
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              Graduation year
              <input {...register("graduationYear")} placeholder="e.g. 2026" />
            </label>
            {errors.graduationYear ? (
              <span>{String(errors.graduationYear.message)}</span>
            ) : null}
          </div>
        </div>
      ) : null}

      {employmentStatus === "Employed" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            Company name
            <input {...register("companyName")} />
          </label>
          {errors.companyName ? <span>{String(errors.companyName.message)}</span> : null}

          <div style={{ marginTop: 12 }}>
            <label>
              Job title
              <input {...register("jobTitle")} />
            </label>
            {errors.jobTitle ? <span>{String(errors.jobTitle.message)}</span> : null}
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              Experience (years)
              <input {...register("experienceYears")} placeholder="e.g. 2" />
            </label>
            {errors.experienceYears ? (
              <span>{String(errors.experienceYears.message)}</span>
            ) : null}
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              Current salary (optional)
              <input {...register("currentSalary", { valueAsNumber: true })} type="number" />
            </label>
            {errors.currentSalary ? <span>{String(errors.currentSalary.message)}</span> : null}
          </div>
        </div>
      ) : null}

      {employmentStatus === "Freelancer" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            Primary skill
            <input {...register("freelancerSkill")} />
          </label>
          {errors.freelancerSkill ? (
            <span>{String(errors.freelancerSkill.message)}</span>
          ) : null}

          <div style={{ marginTop: 12 }}>
            <label>
              Freelancing years (optional)
              <input {...register("freelancingYears")} placeholder="e.g. 3" />
            </label>
            {errors.freelancingYears ? (
              <span>{String(errors.freelancingYears.message)}</span>
            ) : null}
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              Portfolio website (optional)
              <input {...register("portfolioWebsite")} placeholder="https://..." />
            </label>
            {errors.portfolioWebsite ? (
              <span>{String(errors.portfolioWebsite.message)}</span>
            ) : null}
          </div>
        </div>
      ) : null}

      {employmentStatus === "Unemployed" ? (
        <div style={{ marginTop: 12 }}>
          <label>
            Last employment (optional)
            <input {...register("lastEmployment")} placeholder="e.g. Company / Role" />
          </label>
          {errors.lastEmployment ? (
            <span>{String(errors.lastEmployment.message)}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
