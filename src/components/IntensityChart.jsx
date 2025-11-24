import React from "react";
import { AgCharts } from "ag-charts-react";

export default function IntensityChart({ data }) {
  if (!data.length) {
    return <div>Kein Punkt ausgewählt</div>;
  }

  const options = {
    title: { text: "Intensity" },
    data,
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "intensity",
        yName: "Intensity"
      }
    ]
  };

  return <AgCharts options={options} />;
}