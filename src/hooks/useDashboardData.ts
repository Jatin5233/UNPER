import { useEffect, useState } from "react";
import api from "../lib/axios";

interface DashboardData {
  cards: {
    totalElectors: number;
    pendingMigrations: number;
    duplicateAlerts: number;
    pollingStations: number;
  };
  stateDistribution: Array<{
    state: string;
    count: number;
  }>;
}

interface StateChartDataItem {
  state: string;
  fullStateName: string;
  electors: number;
}

interface CategoryDataItem {
  name: string;
  value: number;
  color: string;
}

export const categoryData: CategoryDataItem[] = [
  { name: "General", value: 82, color: "#003d82" },
  { name: "PwD", value: 3, color: "#f59e0b" },
  { name: "Service Voters", value: 2, color: "#10b981" },
  { name: "Overseas", value: 1, color: "#ef4444" },
  { name: "Others", value: 12, color: "#8b5cf6" },
];

export function useNationalDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get("/dashboard/national")
      .then(res => {
        setData(res.data);
        setError(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // Transform state distribution data for the chart
  const stateChartData: StateChartDataItem[] = data?.stateDistribution.map(item => ({
    state: item.state.length > 15 
      ? item.state.slice(0, 12) + '...' 
      : item.state,
    fullStateName: item.state,
    electors: item.count
  })) || [];

  // Format number for Y-axis
  const formatYAxisValue = (value: number): string => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    return value.toString();
  };

  return {
    data,
    loading,
    error,
    stateChartData,
    formatYAxisValue,
  };
}

export type { DashboardData, StateChartDataItem, CategoryDataItem };