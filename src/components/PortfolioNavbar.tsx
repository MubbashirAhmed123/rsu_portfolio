import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { calculateMetrics } from "../utils/calculations";
import { MetricItem } from "./MetricItem";

interface PortfolioNavbarProps {
  grants: Array<{
    id: string;
    company: string;
    symbol: string;
    grantDate: string;
    shares: number;
    grantPrice: number;
    vestedShares: number;
  }>;
  currentPrices?: Record<string, number>;
}

export const PortfolioNavbar = ({
  grants,
  currentPrices = {},
}: PortfolioNavbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const mode = useSelector((state: any) => state.grants.mode);

  const metrics = calculateMetrics(grants, currentPrices);
  const isPositive = metrics.totalGainLoss >= 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  };

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  return (
    <div
      className={`shadow-sm border-b ${
        mode === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="block sm:hidden px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <MetricItem
            icon={<DollarSign className="text-blue-500" size={16} />}
            label="Portfolio"
            value={formatCompactCurrency(metrics.totalCurrentValue)}
            compact
          />
          <MetricItem
            icon={
              isPositive ? (
                <TrendingUp className="text-green-500" size={16} />
              ) : (
                <TrendingDown className="text-red-500" size={16} />
              )
            }
            label="P&L"
            value={formatCompactCurrency(metrics.totalGainLoss)}
            subValue={`(${formatPercentage(
              metrics.totalGainLossPercentage
            )})`}
            valueColor={isPositive ? "text-green-500" : "text-red-500"}
            subValueColor={isPositive ? "text-green-500" : "text-red-500"}
            compact
          />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-center py-2 transition-colors ${
            mode === "dark"
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Hide additional metrics" : "Show additional metrics"
          }
        >
          <span className="text-xs mr-1">More details</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {isExpanded && (
          <div
            className={`space-y-3 pt-2 border-t ${
              mode === "dark" ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <MetricItem
              icon={<Calendar className="text-green-500" size={16} />}
              label="Vested"
              value={formatCompactCurrency(metrics.totalVestedValue)}
              compact
            />
            <MetricItem
              icon={<Calendar className="text-orange-500" size={16} />}
              label="Unvested Shares"
              value={metrics.totalUnvestedShares.toLocaleString()}
              compact
            />
            <MetricItem
              icon={<DollarSign className="text-gray-400" size={16} />}
              label="Grant Value"
              value={formatCompactCurrency(metrics.totalGrantValue)}
              compact
            />
          </div>
        )}
      </div>

      <div className="hidden sm:block lg:hidden px-4 md:px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <MetricItem
            icon={<DollarSign className="text-blue-500" size={20} />}
            label="Total Portfolio"
            value={formatCurrency(metrics.totalCurrentValue)}
          />

          <MetricItem
            icon={<Calendar className="text-green-500" size={20} />}
            label="Vested Value"
            value={formatCurrency(metrics.totalVestedValue)}
          />
          <MetricItem
            icon={<Calendar className="text-orange-500" size={20} />}
            label="Unvested Shares"
            value={metrics.totalUnvestedShares.toLocaleString()}
          />
        </div>
      </div>

      <div className="hidden lg:block px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <MetricItem
            icon={<DollarSign className="text-blue-500" size={20} />}
            label="Total Portfolio"
            value={formatCurrency(metrics.totalCurrentValue)}
          />

          <MetricItem
            icon={<Calendar className="text-green-500" size={20} />}
            label="Vested Value"
            value={formatCurrency(metrics.totalVestedValue)}
          />

          <MetricItem
            icon={<Calendar className="text-orange-500" size={20} />}
            label="Unvested Shares"
            value={metrics.totalUnvestedShares.toLocaleString()}
          />

          <MetricItem
            icon={<DollarSign className="text-gray-400" size={20} />}
            label="Grant Value"
            value={formatCurrency(metrics.totalGrantValue)}
          />
        </div>
      </div>
    </div>
  );
};
