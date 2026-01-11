import { useState, useEffect } from "react";
import api from "../lib/axios";

interface Migration {
  id: string;
  applicantName: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dateOfBirth: string;
  mobile: string;
  email: string;
  relationType: string;
  relationName: string;
  epicNumber: string;
  electorIdNumber: string;
  electorStatus: string;
  oldConstituency: string;
  oldState: string;
  oldDistrict: string;
  oldPartNumber: string;
  oldPollingStation: string;
  oldAddress: {
    line1: string;
    line2: string;
    district: string;
    state: string;
  } | null;
  newConstituency: string;
  newState: string;
  newDistrict: string;
  newPartNumber: string;
  newPollingStation: string;
  appliedDate: string;
  completedDate?: string;
  status: string;
  currentStage: string;
  migrationStatus: string;
  isInterstate: boolean;
    sourceRoApproved: boolean;
  sourceRoApprovedAt: string | null;
  sourceRoNotes: string | null;
  destinationRoApproved: boolean;
  destinationRoApprovedAt: string | null;
  destinationRoNotes: string | null;
  
  // Action permissions
  canApproveAsSource: boolean;
  canApproveAsDestination: boolean;
  userIsSourceRo: boolean;
  userIsDestinationRo: boolean;
}

interface WorkflowData {
  migrations: Migration[];
  statusCounts: {
    all: number;
    pending: number;
    partial: number;
    completed: number;
    rejected: number;
  };
}

const getUserRole = (): string => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).role || 'CITIZEN';
  }
  return 'CITIZEN';
};

const canApprove = (role: string): boolean => {
  return ['CEO', 'DEO', 'RO'].includes(role); // ✅ Added RO
};

const canReject = (role: string): boolean => {
  return ['CEO', 'DEO', 'RO'].includes(role); // ✅ Added RO
};

const canViewWorkflow = (role: string): boolean => {
  return ['CEC', 'CEO', 'DEO', 'RO', 'BLO'].includes(role);
};

export function useMigrationWorkflow() {
  const [data, setData] = useState<WorkflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedMigration, setExpandedMigration] = useState<string | null>(null);
  
  const userRole = getUserRole();
  const hasViewAccess = canViewWorkflow(userRole);
  const showApproveButton = canApprove(userRole);
  const showRejectButton = canReject(userRole);

  const fetchMigrations = async (status?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status && status !== "all") {
        params.append("status", status === "partial" ? "in_progress" : status);
      }
      const response = await api.get(`/migrations/workflow?${params.toString()}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to load migrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasViewAccess) {
      fetchMigrations();
    }
  }, [hasViewAccess]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setExpandedMigration(null); // Close any expanded cards when changing filters
    fetchMigrations(status);
  };

  const handleApprove = async (migrationId: string, currentStatus: string) => {
    if (!canApprove(userRole)) {
      alert(`${userRole} role doesn't have permission to approve migrations.`);
      return;
    }

    let confirmMessage = "Are you sure you want to approve this migration?";
    
    if (userRole === 'DEO') {
      confirmMessage = "As DEO, you are recommending this migration for approval. Continue?";
    } else if (currentStatus === "PENDING") {
      confirmMessage = "This will move the migration to 'In Progress'. Continue?";
    } else if (currentStatus === "IN_PROGRESS") {
      confirmMessage = "This will complete the migration. Continue?";
    }

    if (!confirm(confirmMessage)) return;

    setActionLoading(migrationId);
    try {
      const response = await api.post(`/migrations/workflow/${migrationId}/approve`);
      alert(response.data.message);
      fetchMigrations(selectedStatus);
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to approve migration");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (migrationId: string) => {
    if (!canReject(userRole)) {
      alert(`${userRole} role doesn't have permission to reject migrations.`);
      return;
    }

    const reason = prompt("Please provide a detailed reason for rejection:");
    if (!reason || reason.trim().length < 10) {
      alert("Please provide a detailed reason (minimum 10 characters)");
      return;
    }

    setActionLoading(migrationId);
    try {
      await api.post(`/migrations/workflow/${migrationId}/reject?reason=${encodeURIComponent(reason)}`);
      alert("Migration rejected successfully.");
      fetchMigrations(selectedStatus);
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to reject migration");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleExpand = (migrationId: string) => {
    setExpandedMigration(expandedMigration === migrationId ? null : migrationId);
  };

  const getApproveButtonText = (migrationStatus: string) => {
    if (userRole === 'DEO') return "Recommend";
    if (migrationStatus === "PENDING") return "Approve & Move to Progress";
    if (migrationStatus === "IN_PROGRESS") return "Complete Migration";
    return "Approve";
  };

  // FIX: Apply filtering based on selectedStatus
  const filteredMigrations = selectedStatus === "all" 
    ? (data?.migrations || [])
    : (data?.migrations || []).filter(m => m.status === selectedStatus);

  return {
    data,
    loading,
    selectedStatus,
    actionLoading,
    expandedMigration,
    userRole,
    hasViewAccess,
    showApproveButton,
    showRejectButton,
    filteredMigrations, // Now properly filtered
    handleStatusChange,
    handleApprove,
    handleReject,
    toggleExpand,
    getApproveButtonText,
  };
}

export type { Migration, WorkflowData };