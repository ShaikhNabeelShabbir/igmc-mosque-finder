import "./App.css";
import { Button } from "./components/ui/button";
import GoogleSheetsTable from "./GoogleSheetsTable";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-between w-full px-4 py-2">
        <img
          src="/IGMC-removebg-preview.png"
          alt="IGMC Logo"
          className="w-100 h-32 "
        />
        <h1>Welcome to IGMC Mosque Finder</h1>
        <img
          src="/Hamburg-logo.png"
          alt="Hamburg Logo"
          className="w-100 h-32 "
        />
      </div>

      <p className="text-center">
        This is a simple application to find mosques in Hamburg. Please note
        that this is a simulation and does not provide real-time updates.
      </p>
      <div>
        <GoogleSheetsTable />
      </div>

      <br />

      {/* Center the buttons */}
      <div className="flex flex-row space-x-10">
        <a
          href="https://mawaqit.net/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Mawaqit</Button>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=org.igmg.android&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Turkish App IGMG</Button>
        </a>
      </div>
    </div>
  );
}

export default App;
