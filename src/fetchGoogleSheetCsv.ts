// src/utils/fetchGoogleSheetCsv.ts
import Papa from "papaparse";

const sheetId = "1Bqmhv_xglKfPMfDGJ1ZA3SVZil-GLyDs4_a6yd41A1U";
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

export async function fetchGoogleSheetCsv(): Promise<string[][]> {
  try {
    const response = await fetch(csvUrl);
    const text = await response.text();

    // Parse the CSV data using PapaParse
    const parsedData = Papa.parse(text, {
      header: false, // Set to true if the first row contains headers
      skipEmptyLines: true, // Skip empty lines
    });

    return parsedData.data as string[][]; // Return the parsed CSV data as a 2D array
  } catch (error) {
    console.error("Error fetching Google Sheets CSV data:", error);
    return [];
  }
}
