import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import "ol/ol.css";

export default function MapView({ earthquakes, onSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const features = earthquakes.map((eq) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([eq.lon, eq.lat])),
        earthquake: eq,
      });

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "rgba(220, 20, 60, 0.9)" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        })
      );

      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([16.1, -22.4]),
        zoom: 7,
      }),
    });

    // ---- CLICK HANDLER ----
    map.on("singleclick", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

      if (feature) {
        const eq = feature.get("earthquake");
        onSelect(eq);
      } else {
        onSelect(null);
      }
    });

    return () => map.setTarget(null);
  }, [earthquakes, onSelect]);

  return <div ref={mapRef} className="map-container" />;
}
