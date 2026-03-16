import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export default function PagesFallBackUI(): ReactElement {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Fail to load page</h2>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Reload
      </button>
    </div>
  );
}
