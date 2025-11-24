import React from "react";
import { AgCharts } from "ag-charts-react";

export default function MagnitudeChart({ data }) {
  if (!data.length) {
    return <div>Kein Punkt ausgewählt</div>;
  }

  const options = {
    title: { text: "Magnitude" },
    data,
    series: [
      {
        type: "bar",
        xKey: "name",
        yKey: "magnitude",
        yName: "Magnitude"
      }
    ]
  };

  return <AgCharts options={options} />;
}
