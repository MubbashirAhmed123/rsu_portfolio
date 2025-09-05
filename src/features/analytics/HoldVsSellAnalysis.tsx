import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function HoldVsSellAnalysis() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode);

  if (grants.length === 0) {
    return (
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p
          className={`text-center text-lg font-medium ${
            mode === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No grants available. Add a grant to see an analysis.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-extrabold mb-5 pb-3 border-b ${
          mode === "dark"
            ? "text-white border-gray-700"
            : "text-gray-900 border-gray-200"
        }`}
      >
        Hold vs. Sell Analysis
      </h2>
      <ul className="space-y-4">
        {grants.map((g, i) => {
          const recommendation =
            g.vestedShares > g.shares * 0.5
              ? "Consider selling to diversify"
              : "Safe to hold";

          const recommendationColor = recommendation.includes("selling")
            ? "text-red-600 dark:text-red-400"
            : "text-green-600 dark:text-green-400";

          return (
            <li
              key={i}
              className={`p-4 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.01] hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 ${
                mode === "dark" ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div>
                <h3
                  className={`font-semibold text-lg truncate ${
                    mode === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {g.company} ({g.symbol})
                </h3>
                <p
                  className={`text-sm ${
                    mode === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Total Shares: {g.shares} | Vested: {g.vestedShares}
                </p>
              </div>

              <div className="text-right">
                <span className={`font-bold text-base ${recommendationColor}`}>
                  {recommendation}
                </span>
                <p className={`text-xs font-medium ${recommendationColor}`}>
                  {recommendation.includes("selling")
                    ? "High concentration risk"
                    : "Low concentration risk"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
