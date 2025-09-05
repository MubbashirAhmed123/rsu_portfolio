import { useSelector } from "react-redux";
import TaxEstimator from "../financial/TaxEstimator";
import DiversificationMetrics from "../financial/DiversificationMetrics";
import HoldVsSellAnalysis from "./HoldVsSellAnalysis";
import CompanyPerformance from "./CompanyPerformance";
import type { RootState } from "../../store/store";

export default function AnalyticsDashboard() {
  const mode = useSelector((state: RootState) => state.grants.mode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8 ${
        mode === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold leading-tight ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Analytics & Insights 📊
          </h1>
          <p
            className={`mt-2 text-lg ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore your RSU grants with financial analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaxEstimator />
          <DiversificationMetrics />
          <HoldVsSellAnalysis />
          <CompanyPerformance />
        </div>
      </div>
    </div>
  );
}
