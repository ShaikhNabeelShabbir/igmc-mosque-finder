export interface RowData {
  serialNumber: string;
  masjidName: string;
  district: string;
  languageOfQutbah: string;
  completeAddress: string;
  telefon: string;
  timingsSummer: string;
  timingsWinter: string;
  womensArea: string;
  lastUpdated: string;
  iftarProvided: string;
  taraweehTimings: string;
  latitude?: number; // Optional latitude field
  longitude?: number; // Optional longitude field
}

export async function geocode(): Promise<RowData[]> {
  const jsonUrl = `https://script.google.com/macros/s/AKfycby0M-7bPOsD6uOW3-CVOiyakMSRQNiNvIA2WWShHjtQzzjdrZJwSQpK-XD3jrtJJ--Hig/exec`;

  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();

    const rows: RowData[] = [];

    for (const entry of data) {
      const completeAddress =
        entry["Complete Address (Location on Google Maps)"] || "";

      const geolocation = completeAddress
        ? await fetchGeolocationOSM(completeAddress)
        : null;

      rows.push({
        serialNumber: entry["Serial Number"] || "",
        masjidName: entry["Masjid Name"] || "",
        district: entry["District (Bezirk)"] || "",
        languageOfQutbah: entry["Language of Qutbah"] || "",
        completeAddress: completeAddress,
        telefon: entry["Telefon"] || "",
        timingsSummer:
          entry["Timings Summer (March 31 - October 31, Qutbah Starts)"] || "",
        timingsWinter:
          entry["Timings Winter (October 31 - March 31, Qutbah Starts)"] || "",
        womensArea: entry["Women's Area Availability"] || "",
        lastUpdated: entry["Last Updated"] || "",
        iftarProvided: entry["Iftar provided in Ramadan"] || "",
        taraweehTimings: entry["Taraweeh Timings"] || "",
        latitude: geolocation ? geolocation.lat : undefined,
        longitude: geolocation ? geolocation.lng : undefined,
      });
    }

    return rows;
  } catch (error) {
    console.error("Error fetching Google Sheets JSON data:", error);
    return [];
  }
}

// Helper function to fetch geolocation using OpenStreetMap's Nominatim API
async function fetchGeolocationOSM(
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
