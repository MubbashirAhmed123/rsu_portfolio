import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function CompanyPerformance() {
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
          📈 No grants available. Add a grant to see its performance.
        </p>
      </div>
    );
  }

  const performanceData = grants.map((g) => {
    const randomFactor = 1 + (Math.random() - 0.5) * 0.4;
    const currentValue = g.grantPrice * randomFactor;
    const gainLoss = currentValue - g.grantPrice;
    const gainLossPct = (gainLoss / g.grantPrice) * 100;

    return {
      ...g,
      gainLoss,
      gainLossPct,
    };
  });

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
        Company Performance
      </h2>
      <ul className="space-y-4">
        {performanceData.map((g) => (
          <li
            key={g.id}
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
                Grant Price: ${g.grantPrice.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`font-bold text-lg ${
                  g.gainLoss >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                ${g.gainLoss.toFixed(2)}
              </span>
              <p
                className={`text-sm font-medium ${
                  g.gainLoss >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                ({g.gainLossPct.toFixed(2)}%)
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
