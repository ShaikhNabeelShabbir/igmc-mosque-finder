//
import React, { useEffect, useState } from "react";
import { fetchGoogleSheetJson } from "./fetchGoogleSheetJson";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";
import { SearchIcon } from "lucide-react";
import "./index.css";
import GoogleMaps from "./GoogleMaps";

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
  const [fullData, setFullData] = useState<RowData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheetJson();
        setFullData(sheetData);
        setData(sheetData.slice(0));
        setFilteredData(sheetData.slice(0));
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
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filteredRows = fullData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowerSearchTerm)
        )
      );
      setFilteredData(filteredRows);
    }
  }, [searchTerm, fullData, data]);

  const columns =
    data.length > 0 ? (Object.keys(data[0]) as Array<keyof RowData>) : [];

  return (
    <div className="w-fit">
      <div className="my-8 w-96 mx-auto flex items-center relative">
        <SearchIcon className="absolute left-3 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by any field"
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
        <div className="table-wrapper">
          <Table className="border">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} className="text-left p-2 bg-gray-100 border-r">
                    {col.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell key={col} className="border-r">
                      {col === "completeAddress" ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            row[col]
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {row[col]}
                        </a>
                      ) : (
                        row[col]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No data found for your search term.</p>
      )}
      <div>
        <GoogleMaps />
      </div>
    </div>
  );
};

export default GoogleSheetsTable;
