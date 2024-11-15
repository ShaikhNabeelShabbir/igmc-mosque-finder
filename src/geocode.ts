//geocode.ts
export async function fetchGeolocationOSM(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const osmUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&addressdetails=1`;

  try {
    const response = await fetch(osmUrl, {
      headers: { "User-Agent": "your-app-name" },
    });
    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    } else {
      console.warn(`Geocoding failed for address: ${address}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geolocation from OSM:", error);
    return null;
  }
}
