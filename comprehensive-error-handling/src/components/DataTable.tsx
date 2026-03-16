import { type ReactElement, useEffect, useState } from "react";

export default function DataTable(): ReactElement {
  type ApiRow = {
    id: string;
    name: string;
    category: string;
    https: boolean;
    auth: string;
  };

  const [rows, setRows] = useState<ApiRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const statusColors: Record<"secure" | "insecure", string> = {
    secure: "#16a34a",
    insecure: "#dc2626",
  };

  useEffect(() => {
    const controller = new AbortController();

    async function load(): Promise<void> {
      setLoading(true);
      const res = await fetch("https://api.publicapis.org/entries?https=true", {
        signal: controller.signal,
      });
      const data: {
        entries: Array<{
          API: string;
          Category: string;
          HTTPS: boolean;
          Auth: string;
        }>;
      } = await res.json();
      const mapped: ApiRow[] = data.entries
        .slice(0, 12)
        .map((entry, index) => ({
          id: `${entry.API}-${index}`,
          name: entry.API,
          category: entry.Category,
          https: entry.HTTPS,
          auth: entry.Auth || "None",
        }));
      setRows(mapped);
      setSelectedId(mapped[0]?.id ?? null);

      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return (
    <section aria-label="Data table" style={{ marginTop: 16 }}>
      <h2 style={{ margin: "0 0 8px" }}>Data</h2>
      {loading ? (
        <p style={{ color: "#6b7280", fontSize: 12, margin: "8px 0 0" }}>
          Loading APIs…
        </p>
      ) : (
        <>
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 620,
              }}
            >
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 10,
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    API
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 10,
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 10,
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    HTTPS
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 10,
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Auth
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isSelected = row.id === selectedId;
                  const colorKey: keyof typeof statusColors = row.https
                    ? "secure"
                    : "insecure";
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      style={{
                        background: isSelected ? "#eef2ff" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <td
                        style={{
                          padding: 10,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        {row.name}
                      </td>
                      <td
                        style={{
                          padding: 10,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        {row.category}
                      </td>
                      <td
                        style={{
                          padding: 10,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "2px 10px",
                            borderRadius: 999,
                            border: `1px solid ${statusColors[colorKey]}`,
                            color: statusColors[colorKey],
                            fontSize: 12,
                            lineHeight: "18px",
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 999,
                              background: statusColors[colorKey],
                            }}
                          />
                          {row.https ? "Secure" : "HTTP only"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: 10,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        {row.auth}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: 12 }}>
            Live data from api.publicapis.org (first 12 entries, click to
            highlight).
          </p>
        </>
      )}
    </section>
  );
}
