// src/utils/fetchGoogleSheetCsv.ts
import Papa from "papaparse";

const sheetId = "1uA5DaxkyVlq1HEl2qWOkzxqw6Fsj5jrbOoXkluhWTko";
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

export async function fetchGoogleSheetCsv(): Promise<string[][]> {
  try {
    const response = await fetch(csvUrl);
    const text = await response.text();

    // Parse the CSV data using PapaParse
    const parsedData = Papa.parse(text, {
      header: false, // Set to false to keep all rows as raw data
      skipEmptyLines: true, // Skip empty lines
    });

    // Skip the first row (index 0) to start from the second row
    const dataWithoutFirstRow = parsedData.data.slice(0);

    return dataWithoutFirstRow as string[][]; // Return the data from the second row onward
  } catch (error) {
    console.error("Error fetching Google Sheets CSV data:", error);
    return [];
  }
}
