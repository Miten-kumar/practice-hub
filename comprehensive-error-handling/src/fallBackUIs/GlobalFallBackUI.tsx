import type { ReactElement } from "react";

export default function GlobalFallBackUI(): ReactElement {
  return (
    <div>
      <h2>something went wrong</h2>
      <button
        onClick={() => {
          location.reload();
        }}
      >
        Refresh
      </button>
    </div>
  );
}
