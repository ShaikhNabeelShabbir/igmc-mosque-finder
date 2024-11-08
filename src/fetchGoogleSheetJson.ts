// src/utils/fetchGoogleSheetJson.ts
const sheetId = "1Bqmhv_xglKfPMfDGJ1ZA3SVZil-GLyDs4_a6yd41A1U";
const jsonUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

interface GoogleSheetRow {
  c: { v: string | null }[];
}

export async function fetchGoogleSheetJson(): Promise<string[][]> {
  try {
    const response = await fetch(jsonUrl);
    const text = await response.text();

    // Parse JSON by removing extra characters from the response
    const json = JSON.parse(text.substring(47, text.length - 2));

    // Map data to a 2D array of cell values
    const rows = json.table.rows as GoogleSheetRow[];
    return rows.map((row) => row.c.map((cell) => (cell && cell.v) || ""));
  } catch (error) {
    console.error("Error fetching Google Sheets JSON data:", error);
    return [];
  }
}
