import "./App.css";
import GoogleSheetsTable from "./GoogleSheetsTable";

function App() {
  return (
    <>
      <div>
        <h1>Welcome to IGMC Mosque Finder</h1>
        <p>
          This is a simple application to find mosques in Hamburg. Please note
          that this is a simulation and does not provide real-time updates.
        </p>
        <div>
          <GoogleSheetsTable />
        </div>
      </div>
    </>
  );
}

export default App;
