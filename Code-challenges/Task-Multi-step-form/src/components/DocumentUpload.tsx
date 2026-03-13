import { useFormContext } from "react-hook-form";
import type { FormValues } from "../schemas/fromSchema";

export default function DocumentUpload() {

  const {
    register,
    formState: { errors }
  } = useFormContext<FormValues>();

  const resumeError = errors.resume?.message;

  return (
    <div>

      <h2>Document Upload</h2>

      <label>Upload Resume</label>

      <input type="file" {...register("resume")} />

      <p>{typeof resumeError === "string" ? resumeError : ""}</p>

    </div>
  );
}
