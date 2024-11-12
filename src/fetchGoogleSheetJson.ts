//fetchGoogleSheetJson.ts
interface RowData {
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
}

export async function fetchGoogleSheetJson(): Promise<RowData[]> {
  const jsonUrl = `https://script.google.com/macros/s/AKfycby0M-7bPOsD6uOW3-CVOiyakMSRQNiNvIA2WWShHjtQzzjdrZJwSQpK-XD3jrtJJ--Hig/exec`;

  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();

    const rows: RowData[] = data.map((entry: any) => {
      return {
        serialNumber: entry["Serial Number"] || "",
        masjidName: entry["Masjid Name"] || "",
        district: entry["District (Bezirk)"] || "",
        languageOfQutbah: entry["Language of Qutbah"] || "",
        completeAddress:
          entry["Complete Address (Location on Google Maps)"] || "",
        telefon: entry["Telefon"] || "",
        timingsSummer:
          entry["Timings Summer (March 31 - October 31, Qutbah Starts)"] || "",
        timingsWinter:
          entry["Timings Winter (October 31 - March 31, Qutbah Starts)"] || "",
        womensArea: entry["Women's Area Availability"] || "",
        lastUpdated: entry["Last Updated"] || "",
        iftarProvided: entry["Iftar provided in Ramadan"] || "",
        taraweehTimings: entry["Taraweeh Timings"] || "",
      };
    });

    return rows;
  } catch (error) {
    console.error("Error fetching Google Sheets JSON data:", error);
    return [];
  }
}
