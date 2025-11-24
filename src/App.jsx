import React, { useState } from "react";
import MapView from "./components/MapView.jsx";
import IntensityChart from "./components/IntensityChart.jsx";
import MagnitudeChart from "./components/MagnitudeChart.jsx";
import { earthquakes } from "./data/earthquakes";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        Seismic Dashboard – Karte ↔ Charts Interaktion
      </header>

      <div className="map-panel">
        <MapView earthquakes={earthquakes} onSelect={setSelected} />
      </div>

      <div className="chart-panel">
        <div className="chart-wrapper">
          <IntensityChart data={selected ? [selected] : []} />
        </div>
        <div className="chart-wrapper">
          <MagnitudeChart data={selected ? [selected] : []} />
        </div>
      </div>
    </div>
  );
}