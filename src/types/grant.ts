export interface Grant {
  id: string;
  company: string;
  symbol: string;
  grantDate: string; 
  shares: number;
  grantPrice: number;
  vestingSchedule: string; 
  vestedShares: number;
}


export interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  valueColor?: string;
  subValueColor?: string;
  compact?: boolean;
}


export interface GrantState {
  grants: Grant[];
  mode:string
}



export interface ChartDataPoint {
  x?: string | number | Date;
  y?: number;
  label?: string;
  value?: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type: 'line' | 'pie' | 'doughnut' | 'bar';
  title?: string;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
  height?: number;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  fill?: boolean;
  tension?: number;
  beginAtZero?: boolean;
  formatTooltip?: (context: any) => string;
  formatYAxis?: (value: number) => string;
  theme?: 'light' | 'dark';
  responsive?: boolean;
}
