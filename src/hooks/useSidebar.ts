import { useState, useEffect } from "react";
import { apiClient } from "../services/apiClients";

export interface MenuItem {
  id: string;
  label: string;
  icon: string; // We'll store the icon name as string and map it in the component
}

export function useSidebarData(userRole: string) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!userRole) return;

      try {
        setLoading(true);
        const response = await apiClient(`/user/menu?role=${userRole}`);
        setMenuItems(response.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
        // Fallback to default menu items if API fails
        setMenuItems(getDefaultMenuItems(userRole));
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [userRole]);

  return { menuItems, loading, error };
}

// Fallback function for default menu items
function getDefaultMenuItems(userRole: string): MenuItem[] {
  const baseItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  ];

  if (userRole === 'CEC' || userRole === 'EC') {
    return [
      ...baseItems,
      { id: 'elector-search', label: 'Elector Search', icon: 'Search' },
      { id: 'migration', label: 'Migration Workflow', icon: 'FileText' },
      { id: 'polling-stations', label: 'Polling Stations', icon: 'MapPin' },
      { id: 'audit-log', label: 'Audit & Activity', icon: 'Activity' },
      { id: 'anomaly-analysis', label: 'Anomaly Analysis', icon: 'Shield' },
    ];
  }

  if (userRole === 'CEO' || userRole === 'DEO' || userRole === 'RO') {
    return [
      ...baseItems,
      { id: 'elector-search', label: 'Elector Search', icon: 'Search' },
      { id: 'migration', label: 'Migration Workflow', icon: 'FileText' },
      { id: 'polling-stations', label: 'Polling Stations', icon: 'MapPin' },
      { id: 'audit-log', label: 'Audit & Activity', icon: 'Activity' },
    ];
  }

  if (userRole === 'BLO') {
    return [
      ...baseItems,
      { id: 'elector-search', label: 'Elector Search', icon: 'Search' },
      { id: 'blo-entry', label: 'Data Entry', icon: 'Users' },
      { id: 'migration', label: 'Migration Workflow', icon: 'FileText' },
    ];
  }

  if (userRole === 'Citizen') {
    return [
      { id: 'citizen-portal', label: 'My Dashboard', icon: 'LayoutDashboard' },
      { id: 'elector-search', label: 'Check Status', icon: 'Search' },
    ];
  }

  return baseItems;
}