import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState, useEffect } from "react";

export default function TaxEstimator() {
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
          No grants to estimate taxes. Add a grant to see your tax breakdown.
        </p>
      </div>
    );
  }

  const vestedValue = grants.reduce((sum, g) => {
    const currentPrice = prices[g.symbol] || g.grantPrice;
    return sum + g.vestedShares * currentPrice;
  }, 0);

  const federalWithholding = vestedValue > 0 ? vestedValue * 0.22 : 0;
  const estimatedTotalTax = vestedValue > 0 ? vestedValue * 0.35 : 0;
  const netProceeds = vestedValue - estimatedTotalTax;

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
        Tax Estimator
      </h2>
      <p
        className={`text-sm mb-6 ${
          mode === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        A simple estimation of your potential tax obligations from vested
        shares.
      </p>

      <div
        className={`flex justify-between items-end mb-6 p-4 rounded-xl ${
          mode === "dark" ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <p
          className={`text-base font-semibold ${
            mode === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Vested Value:
        </p>
        <p
          className={`text-2xl font-bold ${
            mode === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          ${vestedValue.toLocaleString()}
        </p>
      </div>

      {vestedValue > 0 ? (
        <>
          <ul className="space-y-4 text-sm">
            <li
              className={`flex justify-between items-center pb-2 border-b ${
                mode === "dark"
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              <span className="font-medium">
                Federal Withholding (22%):
              </span>
              <span
                className={`font-semibold ${
                  mode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                -${federalWithholding.toLocaleString()}
              </span>
            </li>
            <li
              className={`flex justify-between items-center pb-2 border-b ${
                mode === "dark"
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              <span className="font-medium">
                Estimated Total Tax (35%):
              </span>
              <span
                className={`font-semibold ${
                  mode === "dark" ? "text-red-400" : "text-red-600"
                }`}
              >
                -${estimatedTotalTax.toLocaleString()}
              </span>
            </li>
          </ul>

          <div
            className={`mt-6 p-4 rounded-xl flex justify-between items-center border ${
              mode === "dark"
                ? "bg-green-900 border-green-700"
                : "bg-green-50 border-green-200"
            }`}
          >
            <p
              className={`text-base font-semibold ${
                mode === "dark" ? "text-green-300" : "text-green-700"
              }`}
            >
              Net Proceeds:
            </p>
            <span
              className={`text-xl sm:text-2xl font-bold ${
                mode === "dark" ? "text-green-400" : "text-green-600"
              }`}
            >
              ${netProceeds.toLocaleString()}
            </span>
          </div>
        </>
      ) : (
        <div
          className={`p-4 rounded-lg border ${
            mode === "dark"
              ? "bg-yellow-900/20 border-yellow-700 text-yellow-300"
              : "bg-yellow-50 border-yellow-200 text-yellow-700"
          }`}
        >
          <p className="text-sm">No vested shares found.</p>
        </div>
      )}
    </div>
  );
}
