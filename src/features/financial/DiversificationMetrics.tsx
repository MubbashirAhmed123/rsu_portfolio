import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState, useEffect } from "react";

export default function DiversificationMetrics() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode); 
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (grants.length > 0 && Object.keys(prices).length === 0) {
      const initialPrices: Record<string, number> = {};
      grants.forEach((grant) => {
        if (!initialPrices[grant.symbol]) {
          initialPrices[grant.symbol] = grant.grantPrice;
        }
      });
      setPrices(initialPrices);
    }
  }, [grants, prices]);

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
          ⚖️ No grants available. Add a grant to see diversification metrics.
        </p>
      </div>
    );
  }

  const totalValue = grants.reduce((sum, g) => {
    const currentPrice = prices[g.symbol] || g.grantPrice;
    return sum + g.shares * currentPrice;
  }, 0);

  const breakdown = grants.map((g) => {
    const currentPrice = prices[g.symbol] || g.grantPrice;
    const value = g.shares * currentPrice;
    return {
      company: g.company,
      symbol: g.symbol,
      concentration: totalValue > 0 ? (value / totalValue) * 100 : 0,
      value: value,
    };
  });

  const highest = Math.max(...breakdown.map((b) => b.concentration));
  let riskLevel = "Low Risk";
  let riskColor =
    mode === "dark" ? "text-green-400" : "text-green-600";
  if (highest >= 40 && highest < 70) {
    riskLevel = "Medium Risk";
    riskColor =
      mode === "dark" ? "text-yellow-300" : "text-yellow-500";
  }
  if (highest >= 70) {
    riskLevel = "High Risk";
    riskColor = mode === "dark" ? "text-red-400" : "text-red-600";
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
        Diversification Metrics
      </h2>

      <div
        className={`flex justify-between items-end mb-4 ${
          mode === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        <p className="text-base font-semibold">Total Portfolio Value:</p>
        <p
          className={`text-2xl font-bold ${
            mode === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          ${totalValue.toLocaleString()}
        </p>
      </div>

      <ul className="space-y-4">
        {breakdown.map((b, i) => (
          <li key={i}>
            <div className="flex justify-between items-center mb-1">
              <span
                className={`font-medium ${
                  mode === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {b.company} ({b.symbol})
              </span>
              <span
                className={`font-semibold text-lg ${
                  mode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {b.concentration.toFixed(1)}%
              </span>
            </div>
            <div
              className={`w-full rounded-full h-2.5 ${
                mode === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${b.concentration}%` }}
              ></div>
            </div>
            <div
              className={`text-xs mt-1 ${
                mode === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ${b.value.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div
        className={`mt-6 p-4 rounded-xl flex justify-between items-center ${
          mode === "dark" ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            mode === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Risk Level:
        </p>
        <span className={`text-lg font-bold ${riskColor}`}>
          {riskLevel}
        </span>
      </div>
    </div>
  );
}
