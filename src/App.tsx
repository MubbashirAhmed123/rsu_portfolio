import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "./store/grantSlice";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "./components/Sidebar";
import { Menu } from "lucide-react";
import AnalyticsDashboard from "./features/analytics/AnalyticsDashboard";
import VestingPage from "./pages/Vesting";
import GrantsPage from "./pages/Grants";
import PortfolioPage from "./pages/Portfolio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PortfolioNavbar } from "./components/PortfolioNavbar";
// import Footer from "./components/Footer";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const dispatch = useDispatch();

  const grants = useSelector((state: any) => state.grants.grants);
  const mode = useSelector((state: any) => state.grants.mode);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMode = () => {
    dispatch(toggleMode());
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <div
        className={`flex h-screen overflow-hidden transition-colors duration-300 ${mode === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
          }`}
      >
        <Sidebar isOpen={isMenuOpen} onClose={toggleMenu} grants={grants} />

        <main className="flex-1 flex flex-col h-screen relative md:ml-0">
          <div
            className={`px-4 py-3 flex items-center justify-between border-b transition-colors duration-300 
              ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
  `}
          >
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 -ml-2 rounded-lg transition-colors ${mode === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold">RSU Tracker</h2>
            <div
              className="cursor-pointer text-sm font-medium flex items-center"
              onClick={handleMode}
            >
              Mode <span className="text-xs mx-1">{mode === "dark" ? "🌙" : "☀️"}</span>
            </div>
          </div>


          <PortfolioNavbar grants={grants} currentPrices={{}} />

          <div
            className={`flex-1 overflow-y-auto transition-colors duration-300 ${mode === "dark" ? "bg-gray-900" : "bg-gray-50"
              }`}
          >
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-h-full">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<PortfolioPage />} />
                  <Route path="/grants" element={<GrantsPage />} />
                  <Route path="/vests" element={<VestingPage />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                </Routes>
              </div>

              {/* <Footer/> */}
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
