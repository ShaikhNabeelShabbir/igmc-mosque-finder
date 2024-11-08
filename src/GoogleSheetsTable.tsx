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

  useEffect(() => {
    const fetchData = async () => {
      const sheetData = await fetchGoogleSheetCsv();
      setData(sheetData);
    };
    fetchData();
  }, []);

  // Define columns based on the first row (headers) if available
  const columns: Column[] = data[0]
    ? data[0].map((header, idx) => ({ Header: header, accessor: idx }))
    : [];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.accessor}>{column.Header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(1).map((row, rowIndex) => (
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
