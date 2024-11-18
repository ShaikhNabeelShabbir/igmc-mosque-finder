import "./App.css";
import { Button } from "./components/ui/button";
import GoogleSheetsTable from "./GoogleSheetsTable";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex justify-between w-full px-4 py-2 ">
        <img src="/IGMC_LOGO.png" alt="IGMC Logo" className="w-100 h-32 " />
        <h1>Welcome to IGMC Mosque Finder</h1>
        <img
          src="/Hamburg-logo.png"
          alt="Hamburg Logo"
          className="w-100 h-32 "
        />
      </div>
      <div className="mt-5">
        <p className="text-center font-bold text-xl">
          فَإِذَا قَضَيْتُمُ ٱلصَّلَوٰةَ فَٱذْكُرُوا۟ ٱللَّهَ قِيَٰمًا
          وَقُعُودًا وَعَلَىٰ جُنُوبِكُمْۚ فَإِذَا ٱطْمَأْنَنتُمْ فَأَقِيمُوا۟
          ٱلصَّلَوٰةَۚ إِنَّ ٱلصَّلَوٰةَ كَانَتْ عَلَى ٱلْمُؤْمِنِينَ كِتَٰبًا
          مَّوْقُوتًا
          <br></br> (An-Nisa' 4:103)
        </p>
        When you have finished As-Salât (the congregational prayer), remember
        Allâh standing, sitting down,
        <br />
        and (lying down) on your sides, but when you are free from danger,
        perform As-Salât (Iqamat-as-Salât). <br />
        Verily, As-Salât (the prayer) is enjoined on the believers at fixed
        hours.
        <br />( English - Tafsir Ibn Kathir ){" "}
      </div>
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
