import { useState, useEffect } from "react";
import api from "../lib/axios";

interface StateDashboardData {
  selectedState: string;
  selectedDistrict: string;
  states: string[];
  districts: string[];
  cards: {
    totalElectors: number;
    pendingMigrations: number;
    pollingStations: number;
    verificationQueue: number;
  };
  districtData: Array<{
    district: string;
    electors: number;
    pending: number;
    stations: number;
  }>;
  constituencies: Array<{
    name: string;
    district: string;
    electors: number;
    pending: number;
    verified: number;
    station: string;
  }>;
}

export function useStateDashboard() {
  const [data, setData] = useState<StateDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  // Fetch dashboard data
  const fetchData = async (state: string, district: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ state_name: state });
      if (district !== "All") {
        params.append("district_name", district);
      }
      const response = await api.get(`/dashboard/state?${params.toString()}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to load state dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load - fetch first available state
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const response = await api.get("/dashboard/state?state_name=Maharashtra");
        setData(response.data);
        setSelectedState(response.data.selectedState);
      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeDashboard();
  }, []);

  // Handle state change
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedDistrict("All");
    fetchData(newState, "All");
  };

  // Handle district change
  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    fetchData(selectedState, newDistrict);
  };

  // Apply filters
  const applyFilters = () => {
    fetchData(selectedState, selectedDistrict);
  };

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return {
    data,
    loading,
    selectedState,
    selectedDistrict,
    handleStateChange,
    handleDistrictChange,
    applyFilters,
    formatNumber,
  };
}

export type { StateDashboardData };