import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Event } from "../models/Event";
import "../assets/css/BasicMap.css";

interface BasicMapProps {
  events: Event[];
  map: maptilersdk.Map | null;
}

export default function BasicMap({ events, map }: BasicMapProps) {
  const mapContainer = useRef(null);
  const boston = { lng: -71.08980336931096, lat: 42.34053842478537 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "RBbQkhvYCQ9Y2rlfUwug";

  useEffect(() => {
    if (!mapContainer.current || !events.length || !map) return; // Ensure map container and events are available

    // Clear existing markers
    if (map.current) {
      map.current.remove();
    }

    // Initialize the map
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [boston.lng, boston.lat],
      zoom: zoom,
    });

    // Add marker for Boston
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([boston.lng, boston.lat])
      .addTo(map.current);

    // Add markers for each event's location
    events.forEach((plantationEvent) => {
      const coordinates = {
        lat: plantationEvent.location.latitude,
        lng: plantationEvent.location.longitude,
      };
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map.current);
    });
  }, [boston.lng, boston.lat, zoom, events]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
