import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export default function ComponentsFallBackUI(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <h2>something went wrong</h2>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Retry
      </button>
    </div>
  );
}
