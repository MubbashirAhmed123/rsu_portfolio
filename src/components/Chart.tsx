import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

import type { ChartProps } from "../types/grant";
import type { RootState } from "../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
);

const defaultColors = [
  "#4CAF50", "#2196F3", "#FF9800", "#9C27B0",
  "#F44336", "#00BCD4", "#8BC34A", "#FFC107",
  "#795548", "#607D8B", "#E91E63", "#3F51B5"
];

export default function ReusableChart({
  data,
  type,
  title,
  loading = false,
  error = null,
  emptyMessage = "No data available",
  className = "",
  height = 300,
  colors = defaultColors,
  showLegend = true,
  showGrid = true,
  fill = false,
  tension = 0.3,
  beginAtZero = true,
  formatTooltip,
  formatYAxis,
  responsive = true,
}: ChartProps) {
  const mode = useSelector((state: RootState) => state.grants.mode); 
  const isDark = mode === "dark";

  if (loading) {
    return (
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 flex justify-center items-center ${className} ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-lg`}>
          📈 Loading chart data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 ${className} ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p className={`${isDark ? "text-red-400" : "text-red-600"} text-center text-lg`}>
          {error}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 flex justify-center items-center ${className} ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-lg`}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  const prepareChartData = () => {
    if (type === "pie" || type === "doughnut") {
      return {
        labels: data.map((item) => item.label || item.x),
        datasets: [
          {
            data: data.map((item) => item.value || item.y),
            backgroundColor: colors,
            borderColor: isDark ? "#374151" : "#ffffff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      };
    }

    return {
      labels: data.map((item) => item.x),
      datasets: [
        {
          label: title || "Data",
          data: data.map((item) => item.y),
          backgroundColor: fill ? colors[0] + "40" : colors[0],
          borderColor: colors[0],
          borderWidth: type === "line" ? 3 : 2,
          fill: fill,
          tension: type === "line" ? tension : 0,
          pointBackgroundColor: colors[0],
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: type === "line" ? 4 : 0,
          pointHoverRadius: type === "line" ? 6 : 0,
        },
      ],
    };
  };

  const getChartOptions = () => {
    const textColor = isDark ? "#9CA3AF" : "#6B7280";
    const gridColor = isDark ? "#374151" : "#E5E7EB";

    const baseOptions = {
      responsive,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend,
          position:
            type === "pie" || type === "doughnut"
              ? ("bottom" as const)
              : ("top" as const),
          labels: {
            color: textColor,
            font: { size: 12 },
            padding: 16,
          },
        },
        title: { display: false },
        tooltip: {
          callbacks: {
            label: formatTooltip || ((context: any) => {
              if (type === "pie" || type === "doughnut") {
                return `${context.label}: ${context.parsed}`;
              }
              return `${context.dataset.label}: ${
                formatYAxis ? formatYAxis(context.parsed.y) : context.parsed.y
              }`;
            }),
          },
          backgroundColor: isDark ? "#1F2937" : "#ffffff",
          titleColor: isDark ? "#F9FAFB" : "#111827",
          bodyColor: isDark ? "#D1D5DB" : "#374151",
          borderColor: isDark ? "#374151" : "#E5E7EB",
          borderWidth: 1,
        },
      },
    };

    if (type === "pie" || type === "doughnut") {
      return { ...baseOptions, cutout: type === "doughnut" ? "60%" : "0%" };
    }

    return {
      ...baseOptions,
      scales: {
        x: {
          display: true,
          grid: { display: false, color: gridColor },
          ticks: { color: textColor, font: { size: 11 } },
        },
        y: {
          display: true,
          beginAtZero,
          grid: { display: showGrid, color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 11 },
            callback: formatYAxis || ((value: any) =>
              typeof value === "number" ? value.toLocaleString() : value),
          },
        },
      },
    };
  };

  const chartData = prepareChartData();
  const chartOptions = getChartOptions();

  const renderChart = () => {
    const props = { data: chartData, options: chartOptions as any, height };
    switch (type) {
      case "pie":
        return <Pie {...props} />;
      case "doughnut":
        return <Doughnut {...props} />;
      case "bar":
        return <Bar {...props} />;
      case "line":
      default:
        return <Line {...props} />;
    }
  };

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${className} ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      {title && (
        <h2
          className={`text-2xl font-extrabold mb-5 border-b pb-3 ${
            isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
          }`}
        >
          {title}
        </h2>
      )}
      <div className="relative" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
}
