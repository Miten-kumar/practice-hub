import { useFormContext } from "react-hook-form";
import type { FormValues } from "../schemas/fromSchema";

export default function Review() {

  const { getValues } = useFormContext<FormValues>();

  const data = getValues();

  return (
    <div>

      <h2>Review</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );
}
