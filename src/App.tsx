import "./App.css";
import { Button } from "./components/ui/button";
import GoogleSheetsTable from "./GoogleSheetsTable";

function App() {
  return (
    <div className="min-w-full min-h-screen flex flex-col items-center justify-start gap-3">
      <div className="flex justify-between w-full px-4 py-2">
        <div className="mr-3 md:flex">
          <img
            src="/IGMC_LOGO.png"
            alt="IGMC Logo"
            className="w-56 h-18 md:w-100 md:h-24 lg:w-100 lg:h-24 mb-5 md:mr-24"
          />
          <h1 className="text-3xl font-medium text-start">
            Welcome to IGMC Mosque Finder
          </h1>
        </div>
        <img
          src="/Hamburg-logo.png"
          alt="Hamburg Logo"
          className="w-24 h-12 md:w-36 md:h-16"
        />
      </div>
      <div>
        <p className="text-center font-semibold text-lg">
          O mankind, indeed We have created you from male and female and made
          you peoples and tribes that you may know one another. Indeed, the most
          noble of you in the sight of Allah is the most righteous of you.
          Indeed, Allah is Knowing and Acquainted. <br></br> (Q.S. Al-Hujurat :
          13)
        </p>
      </div>
      <GoogleSheetsTable />
      {/* Center the buttons */}
      <div className="flex gap-3 mt-3">
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
        <a
          href="https://vimv-igmc.de/hamburg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>IGMC</Button>
        </a>
      </div>
    </div>
  );
}

export default App;
