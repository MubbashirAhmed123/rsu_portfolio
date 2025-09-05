import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  X,
  BarChart2,
  DollarSign,
  PieChart,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  grants?: Array<{
    id: string;
    company: string;
    symbol: string;
    grantDate: string;
    shares: number;
    grantPrice: number;
    vestedShares: number;
  }>;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const mode = useSelector((state: any) => state.grants.mode);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;

    if (mode === "dark") {
      return `flex items-center px-3 sm:px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-gray-700 text-blue-400 font-semibold"
          : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
      }`;
    }

    return `flex items-center px-3 sm:px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;
  };

  const navigationItems = [
    { path: "/", icon: PieChart, label: "Portfolio" },
    { path: "/grants", icon: DollarSign, label: "Grants" },
    { path: "/vests", icon: TrendingUp, label: "Vesting" },
    { path: "/analytics", icon: BarChart2, label: "Analytics" },
  ];

  return (
    <nav
      className={`fixed inset-y-0 left-0 z-30 md:w-64 md:static transform overflow-hidden transition-transform duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-0"
      } ${
        mode === "dark"
          ? "bg-gray-900 border-gray-800 text-gray-100"
          : "bg-white shadow-lg border-gray-200 text-gray-900"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 md:p-6 border-b ${
          mode === "dark" ? "border-gray-800" : "border-gray-100"
        }`}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
          RSU Tracker
        </h1>
        <button
          onClick={onClose}
          className={`md:hidden p-1 rounded-lg transition-colors ${
            mode === "dark"
              ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="px-4 md:px-6 py-4">
        <ul className="space-y-1 sm:space-y-2">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link to={path} onClick={onClose} className={getLinkClasses(path)}>
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

   
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 border-t text-xs text-center ${
          mode === "dark"
            ? "border-gray-800 text-gray-500"
            : "border-gray-100 text-gray-400"
        }`}
      >
        © {new Date().getFullYear()} RSU Tracker
      </div>
    </nav>
  );
};
