import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import ReusableChart from "../../components/Chart";
import type { ChartDataPoint } from "../../types/grant";

async function mockFetchHistoricalPrices(symbol: string) {
  console.log(symbol)
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Record<string, any> = {};
      const today = new Date();
      for (let i = 89; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        const basePrice = 150 + Math.sin(i * 0.2) * 20 + Math.random() * 5;
        data[dateStr] = { "4. close": basePrice.toFixed(2) };
      }
      resolve(data);
    }, 500); 
  });
}

export default function PortfolioPerformanceChart() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);

      let combined: Record<string, number> = {};

      for (const g of grants) {
        const data = (await mockFetchHistoricalPrices(g.symbol)) as Record<string, any>;

        for (const [date, info] of Object.entries(data)) {
          const price = parseFloat(info["4. close"]);
          const value = g.shares * price;
          combined[date] = (combined[date] || 0) + value;
        }
      }

      const sorted = Object.fromEntries(
        Object.entries(combined).sort(
          (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
        )
      );

      const transformedData: ChartDataPoint[] = Object.entries(sorted).map(([date, value]) => ({
        x: new Date(date).toLocaleDateString(),
        y: value,
      }));

      setChartData(transformedData);
      setLoading(false);
    };

    if (grants.length > 0) loadHistory();
  }, [grants]);

  return (
    <ReusableChart
      data={chartData}
      type="line"
      title="Portfolio Performance Over Time"
      loading={loading}
      emptyMessage="No grants available. Add some to see your portfolio performance."
      colors={["#3B82F6"]}
      fill={true}
      tension={0.3}
      showLegend={false}
      formatYAxis={(value) => `$${value.toLocaleString()}`}
      formatTooltip={(context) => `Value: $${context.parsed.y.toLocaleString()}`}
      height={320}
      className="mb-6"
    />
  );
}