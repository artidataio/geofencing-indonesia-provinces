import "./styles.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useRef, useMemo } from "react";

const center = {
  lat: 51.505,
  lng: -0.09
};

export default function App() {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      }
    }),
    []
  );

  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          draggable
          eventHandlers={eventHandlers}
          ref={markerRef}
        />
      </MapContainer>
      <p>{JSON.stringify(position)}</p>
    </div>
  );
}
