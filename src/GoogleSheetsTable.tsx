import React, { useEffect, useState } from "react";
import { fetchGoogleSheetJson } from "./fetchGoogleSheetJson";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";
import { SearchIcon } from "lucide-react";
import "./index.css";
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

const GoogleSheetsTable: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheetJson();
        setData(sheetData);
        setFilteredData(sheetData);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filteredRows = data.filter((row) =>
        Object.values(row).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filteredRows);
    }
  }, [searchTerm, data]);

  const columns =
    data.length > 0 ? (Object.keys(data[0]) as Array<keyof RowData>) : [];

  return (
    <div>
      <div className="my-8 w-96 mx-auto flex items-center relative">
        <SearchIcon className="absolute left-3 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Enter District (Bezirk)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 pl-10 w-full bg-white"
        />
      </div>

      {loading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredData.length > 0 ? (
        <Table className="border">
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col}>{row[col]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No data found for your search term.</p>
      )}
    </div>
  );
};

export default GoogleSheetsTable;
