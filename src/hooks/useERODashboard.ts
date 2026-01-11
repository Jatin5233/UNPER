import { useState, useEffect } from "react";
import api from "../lib/axios";

interface ERODashboardData {
  cards: {
    totalElectors: number;
    pendingApplications: number;
    todaysVerifications: number;
    rejectedApplications: number;
  };
  recentApplications: Array<{
    id: string;
    applicantName: string;
    formType: string;
    applicationDate: string;
    status: string;
    constituency: string;
    mobile: string;
  }>;
  verificationQueue: Array<{
    id: string;
    applicantName: string;
    formType: string;
    submittedDate: string;
    priority: string;
    constituency: string;
  }>;
  constituencyStats: Array<{
    constituency: string;
    totalElectors: number;
    pending: number;
    verified: number;
  }>;
}

export function useERODashboard() {
  const [data, setData] = useState<ERODashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await api.get("/dashboard/ero");
      setData(response.data);
      setError(false);
    } catch (err) {
      console.error("Failed to load ERO dashboard:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleVerify = async (applicationId: string) => {
    setActionLoading(applicationId);
    try {
      await api.post(`/applications/${applicationId}/verify`);
      alert("Application verified successfully");
      fetchDashboard(); // Refresh data
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to verify application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (applicationId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason || reason.trim().length < 10) {
      alert("Please provide a detailed reason (minimum 10 characters)");
      return;
    }

    setActionLoading(applicationId);
    try {
      await api.post(`/applications/${applicationId}/reject`, { reason });
      alert("Application rejected successfully");
      fetchDashboard(); // Refresh data
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to reject application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = (applicationId: string) => {
    // Navigate to detailed view or open modal
    console.log("View details for:", applicationId);
  };

  const formatNumber = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filteredApplications = data?.recentApplications.filter(app => {
    if (selectedFilter === "all") return true;
    return app.status.toLowerCase() === selectedFilter;
  }) || [];

  return {
    data,
    loading,
    error,
    selectedFilter,
    setSelectedFilter,
    actionLoading,
    handleVerify,
    handleReject,
    handleViewDetails,
    formatNumber,
    filteredApplications,
    refreshDashboard: fetchDashboard,
  };
}

export type { ERODashboardData };