import React, { type ReactElement, useEffect, useState } from "react";
import { fetchWithRetry } from "../utils/fetchWithRetry";

type ChartData = {
  label: string;
  value: number;
};

type ChartApiResponse = { data: ChartData[] };

const Chart: React.FC = (): ReactElement => {
  const [data, setData] = useState<ChartData[]>([]);
  // const data: ChartData[] = [
  //   { label: "Jan", value: 100 },
  //   { label: "Feb", value: 200 },
  //   { label: "Mar", value: 150 },
  // ];
  // const data: ChartData[] = null;
  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const res = await fetchWithRetry<ChartApiResponse>(
          "http://localhost:3000/api/chartData",
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        window.alert("Request failed please try after sometime");
      }
    }
    void getData();
  }, []);
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div style={{ width: "400px" }}>
      <h3>Revenue Chart</h3>

      {data.map((item) => (
        <div key={item.label} style={{ marginBottom: "8px" }}>
          <div>{item.label}</div>

          <div
            style={{
              height: "20px",
              width: `${(item.value / maxValue) * 100}%`,
              background: "steelblue",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Chart;
