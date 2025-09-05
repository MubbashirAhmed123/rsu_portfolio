import { useSelector } from "react-redux";
import { getVestedBreakdown } from "../../utils/vested";
import type { RootState } from "../../store/store";
import ReusableChart from "../../components/Chart";
import type { ChartDataPoint } from "../../types/grant";

export default function VestedVsUnvested() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode); 
  const { vested, unvested } = getVestedBreakdown(grants);

  if (grants.length === 0) {
    return (
      <ReusableChart
        data={[]}
        type="doughnut"
        title="Vested vs. Unvested"
        emptyMessage="📊 No data available. Add a grant to see your breakdown."
        height={350}
      />
    );
  }

  const chartData: ChartDataPoint[] = [
    { label: "Vested", value: vested },
    { label: "Unvested", value: unvested },
  ];

  return (
    <div>
      <ReusableChart
        data={chartData}
        type="doughnut"
        title="Vested vs. Unvested"
        colors={["#10B981", "#EF4444"]}
        formatTooltip={(context) => `${context.label}: ${context.parsed} shares`}
        height={350}
        className="mb-6"
      />

      <div
        className={`flex justify-around items-center mt-6 p-4 rounded-xl ${
          mode === "dark" ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <p
            className={`text-sm font-medium ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Vested
          </p>
          <p
            className={`text-xl sm:text-2xl font-bold ${
              mode === "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            {vested.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <p
            className={`text-sm font-medium ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Unvested
          </p>
          <p
            className={`text-xl sm:text-2xl font-bold ${
              mode === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            {unvested.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
