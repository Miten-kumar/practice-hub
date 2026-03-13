import { useFormContext } from "react-hook-form";

export default function DocumentUpload() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h2>Documents</h2>

      <div>
        <label>
          Profile picture (jpg/png, max 2MB)
          <input {...register("profilePicture")} type="file" accept="image/*" />
        </label>
        {errors.profilePicture ? <span>{String(errors.profilePicture.message)}</span> : null}
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          Resume (PDF, max 5MB)
          <input {...register("resume")} type="file" accept="application/pdf" />
        </label>
        {errors.resume ? <span>{String(errors.resume.message)}</span> : null}
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          Portfolio file (optional)
          <input {...register("portfolioFile")} type="file" />
        </label>
        {errors.portfolioFile ? <span>{String(errors.portfolioFile.message)}</span> : null}
      </div>
    </div>
  );
}

