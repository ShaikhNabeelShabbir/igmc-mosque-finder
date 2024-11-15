import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { fetchGoogleSheetJson } from "./fetchGoogleSheetJson";
import { fetchGeolocationOSM } from "./geocode";

// Leaflet marker icon fix for proper display
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // Position adjustment for the marker icon
});
L.Marker.prototype.options.icon = defaultIcon;

interface LocationData {
  lat: number;
  lng: number;
  name: string;
}

const GoogleMaps = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    async function loadLocations() {
      const sheetData = await fetchGoogleSheetJson();
      const locationData: LocationData[] = [];

      // Geocode each address
      for (const entry of sheetData) {
        const address = entry["completeAddress"];
        if (address) {
          const geolocation = await fetchGeolocationOSM(address);
          if (geolocation) {
            locationData.push({
              lat: geolocation.lat,
              lng: geolocation.lng,
              name: entry["masjidName"] || "Unnamed Location",
            });
          }
        }
      }
      setLocations(locationData);
    }

    loadLocations();
  }, []);

  return (
    <div className="flex justify-center mx-[] mt-5 w-96 h-96 border border-purple-600">
      <MapContainer
        center={[53.457894098699, 9.982964368568535]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GoogleMaps;
