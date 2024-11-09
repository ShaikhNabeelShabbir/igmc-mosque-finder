// src/utils/fetchGoogleSheetJson.ts
export async function fetchGoogleSheetJson() {
  const jsonUrl = `https://spreadsheets.google.com/feeds/list/1uA5DaxkyVlq1HEl2qWOkzxqw6Fsj5jrbOoXkluhWTko/od6/public/values?alt=json`;

  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();

    // Parse the Google Sheets JSON format
    const rows = data.feed.entry.map((entry: any) => {
      const row: { [key: string]: string } = {};
      Object.keys(entry).forEach((key) => {
        if (key.startsWith("gsx$")) {
          row[key.slice(4)] = entry[key].$t;
        }
      });
      return row;
    });

    return rows; // Returns an array of row objects
  } catch (error) {
    console.error("Error fetching Google Sheets JSON data:", error);
    return [];
  }
}
