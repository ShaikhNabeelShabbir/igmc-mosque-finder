import "./App.css";
import GoogleSheetsTable from "./GoogleSheetsTable";

function App() {
  return (
    <div>
      <div className="flex justify-between w-full px-4 py-2">
        <img
          src="/IGMC.png"
          alt="IGMC Logo"
          className="w-100 h-32 border border-red-950"
        />
        <h1>Welcome to IGMC Mosque Finder</h1>
        <img
          src="/Hamburg-logo.png"
          alt="Hamburg Logo"
          className="w-100 h-32 border border-red-950"
        />
      </div>

      <p>
        This is a simple application to find mosques in Hamburg. Please note
        that this is a simulation and does not provide real-time updates.
      </p>
      <div>
        <GoogleSheetsTable />
      </div>
    </div>
  );
}

export default App;
