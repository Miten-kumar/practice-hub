import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileSchema, type FileUploads } from "../schemas/fileSchema";
import { formatFileSize } from "../utils/validationHelpers";
import { useWatch } from "react-hook-form";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

const StepFileUpload = ({ onNext, onPrev }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FileUploads>({
    mode: "all",
    resolver: zodResolver(FileSchema),
  });

  const watchedFiles = useWatch({ control, name: "files" });
  const fileList = watchedFiles ? Array.from(watchedFiles) : [];

  const onSubmit = (_data: FileUploads) => {
    // Files cannot go in localStorage — store metadata or upload here
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset>
        <legend>File Upload</legend>

        <div>
          <label htmlFor="files">
            Upload Files (JPEG, PNG, PDF — max 5 MB each)
          </label>
          <input
            id="files"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            {...register("files")}
            aria-invalid={!!errors.files}
            aria-describedby="files-error"
          />
          <span id="files-error" role="alert">
            {errors.files?.message as string}
          </span>
        </div>

        {fileList.length > 0 && (
          <ul aria-label="Selected files" aria-live="polite">
            {fileList.map((file, i) => (
              <li key={i}>
                {file.name} — {formatFileSize(file.size)}
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <button type="button" onClick={onPrev}>Back</button>
      <button type="submit" disabled={isSubmitting}>Next</button>
    </form>
  );
};

export default StepFileUpload;