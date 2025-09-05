import { useSelector } from "react-redux";
import type { MetricItemProps } from "../types/grant";

export const MetricItem = ({
  icon,
  label,
  value,
  subValue,
  valueColor,
  subValueColor,
  compact = false,
}: MetricItemProps) => {
  const mode = useSelector((state: any) => state.grants.mode);

  const resolvedValueColor =
    valueColor ||
    (mode === "dark" ? "text-gray-100" : "text-gray-900");

  const resolvedSubValueColor =
    subValueColor ||
    (mode === "dark" ? "text-gray-400" : "text-gray-500");

  const labelColor =
    mode === "dark"
      ? compact
        ? "text-gray-500"
        : "text-gray-400"
      : compact
      ? "text-gray-400"
      : "text-gray-500";

  return (
    <div className="flex items-center space-x-2 min-w-0">
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className={`text-xs ${labelColor} truncate`}>{label}</p>
        <div className="flex items-center space-x-1">
          <p
            className={`${compact ? "text-sm" : "text-lg"} font-semibold ${resolvedValueColor} truncate`}
          >
            {value}
          </p>
          {subValue && (
            <span
              className={`text-xs font-medium ${resolvedSubValueColor} whitespace-nowrap`}
            >
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
