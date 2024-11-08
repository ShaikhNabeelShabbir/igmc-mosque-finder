// src/components/GoogleSheetsTable.tsx
import React, { useEffect, useState } from "react";
import { fetchGoogleSheetCsv } from "./fetchGoogleSheetCsv"; // Adjust path as necessary
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

interface Column {
  Header: string;
  accessor: string | number;
}

const GoogleSheetsTable: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetData = await fetchGoogleSheetCsv();
      setData(sheetData);
      setFilteredData(sheetData); // Initially set filteredData to all rows
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter rows based on the search term
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filteredRows = data.filter((row) =>
        row.some((cell) =>
          cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filteredRows);
    }
  }, [searchTerm, data]);

  // Define columns based on the first row (headers) if available
  const columns: Column[] = data[0]
    ? data[0].map((header, idx) => ({ Header: header, accessor: idx }))
    : [];

  return (
    <div>
      <br />
      <br />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter District (Bezirk)	"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full bg-white"
        />
      </div>

      <Table className="border-blue-500">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.accessor}>{column.Header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(1).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GoogleSheetsTable;
