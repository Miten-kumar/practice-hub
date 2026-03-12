import React, { useState } from "react";

export default function FileUploader() {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      setError("Only images allowed");
      return;
    }

    setFileName(file.name);
    setError("");
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {fileName && <p>{fileName}</p>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
