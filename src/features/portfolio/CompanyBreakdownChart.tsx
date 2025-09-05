import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStockPrices } from "../../api/apiCall";
import { calculateCompanyBreakdown } from "../../utils/calculations";
import type { RootState } from "../../store/store";
import ReusableChart from "../../components/Chart";
import type { ChartDataPoint } from "../../types/grant";

export default function CompanyBreakdownChart() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const symbols = grants.map((g) => g.symbol);
        if (symbols.length > 0) {
          const fetchedPrices = await fetchStockPrices(symbols);
          console.log("fetchedPrices", fetchedPrices); 
          
          const breakdown = calculateCompanyBreakdown(grants, fetchedPrices);
          
          const transformedData: ChartDataPoint[] = Object.entries(breakdown).map(([company, value]) => ({
            label: company,
            value: value,
          }));

          setChartData(transformedData);
        }
      } catch (err) {
        console.error("error:", err);
        setError("Failed to fetch stock prices.");
      } finally {
        setLoading(false);
      }
    };

    if (grants.length > 0) {
      loadPrices();
    }
  }, [grants]);

  return (
    <ReusableChart
      data={chartData}
      type="pie"
      title="Company Breakdown"
      loading={loading}
      error={error}
      emptyMessage="No grants available."
      height={350}
      formatTooltip={(context) => `${context.label}: $${context.parsed.toLocaleString()}`}
      className="mb-6"
    />
  );
}
