import CompanyBreakdownChart from "../features/portfolio/CompanyBreakdownChart";
import PerformanceSummary from "../features/portfolio/PerformanceSummary";
import PortfolioPerformanceChart from "../features/portfolio/PortfolioPerformanceChart";

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
      <PerformanceSummary />
      <CompanyBreakdownChart/>
      <PortfolioPerformanceChart/>
    </div>
  );
}
