import type { ReactElement } from "react";
import Chart from "../components/Charts";
import DataTable from "../components/DataTable";
import ComponentsErrorBoundry from "../errorBoundaries/ComponentsErrorBoundary";

export default function Dashboard(): ReactElement {
  return (
    <main style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ margin: "0 0 12px" }}>Dashboard</h1>
      <p style={{ margin: "0 0 16px", color: "#6b7280" }}>
        Temporary dashboard layout (replace with real content later).
      </p>
      <ComponentsErrorBoundry>
        <Chart />
      </ComponentsErrorBoundry>
      <ComponentsErrorBoundry>
        <DataTable />
      </ComponentsErrorBoundry>
    </main>
  );
}
