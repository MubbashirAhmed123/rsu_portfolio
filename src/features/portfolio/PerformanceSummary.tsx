import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchStockPrices } from "../../api/apiCall";
import {
  calculatePortfolioValue,
  calculateTotalGainLoss,
} from "../../utils/calculations";
import type { RootState } from "../../store/store";

export default function PerformanceSummary() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (grants.length === 0) return;

    const loadPrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const symbols = grants.map((g) => g.symbol);
        const fetchedPrices = await fetchStockPrices(symbols);

        if (Object.keys(fetchedPrices).length === 0) {
          setError(
            "Failed to fetch stock prices."
          );
        } else {
          setPrices(fetchedPrices);
        }
      } catch (err) {
        console.error("Error loading prices:", err);
        setError("Failed to load stock prices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, [grants]);

  if (loading) {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-300 flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          📈 Loading portfolio summary...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-2xl shadow-md transition-colors duration-300">
        <p className="text-red-800 dark:text-red-300 font-medium">
          <span className="font-bold">Error:</span> {error}
        </p>
      </div>
    );
  }

  if (grants.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-300 flex justify-center items-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
           No grants available. Add a grant to see your portfolio summary.
        </p>
      </div>
    );
  }

  if (Object.keys(prices).length === 0) {
    return (
      <div className="p-8 bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl shadow-md transition-colors duration-300">
        <p className="text-yellow-800 dark:text-yellow-300 font-medium text-center">
           Waiting for stock price data...
        </p>
      </div>
    );
  }

  const { gainLoss, gainLossPercent } = calculateTotalGainLoss(grants, prices);
  const portfolioValue = calculatePortfolioValue(grants, prices);

  const dailyChange = Math.random() * 2 - 1;
  const dailyChangeColor = dailyChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  const gainLossColor = gainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Portfolio Value
          </h3>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            ${portfolioValue.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Total Gain/Loss
          </h3>
          <p className={`text-3xl font-extrabold mt-1 ${gainLossColor}`}>
            ${gainLoss.toLocaleString()} ({gainLossPercent.toFixed(2)}%)
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Daily Change
          </h3>
          <p className={`text-3xl font-extrabold mt-1 ${dailyChangeColor}`}>
            {dailyChange > 0 ? "+" : ""}{dailyChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}