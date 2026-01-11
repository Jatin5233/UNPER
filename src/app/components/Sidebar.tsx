import {
  LayoutDashboard,
  Search,
  Users,
  FileText,
  MapPin,
  Activity,
  ChevronRight,
  Shield
  , BarChart3
} from "lucide-react";
import { useSidebarData } from "../../hooks";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: string;
}

// Icon mapping for dynamic icon rendering
const iconMap = {
  LayoutDashboard,
  Search,
  Users,
  FileText,
  MapPin,
  Activity,
  Shield,
};

// Fallback function for default menu items when API fails
function getFallbackMenuItems(userRole: string) {
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
      { id: 'statistical-analysis', label: 'Statistical Analysis', icon: BarChart3 },
    ];
  }

  if (userRole === 'CEO' || userRole === 'DEO' || userRole === 'RO') {
    return [
      ...baseItems,
      { id: 'elector-search', label: 'Elector Search', icon: 'Search' },
      { id: 'migration', label: 'Migration Workflow', icon: 'FileText' },
      { id: 'polling-stations', label: 'Polling Stations', icon: 'MapPin' },
      { id: 'audit-log', label: 'Audit & Activity', icon: 'Activity' },
      { id: 'statistical-analysis', label: 'Statistical Analysis', icon: BarChart3 },
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

export function Sidebar({ activeView, onViewChange, userRole }: SidebarProps) {
  const { menuItems, loading, error } = useSidebarData(userRole);

  if (loading) {
    return (
      <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <nav className="p-4 space-y-1">
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </nav>
      </aside>
    );
  }

  if (error) {
    // Fallback to default menu items if API fails
    const fallbackItems = getFallbackMenuItems(userRole);
    return (
      <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <nav className="p-4 space-y-1">
          {fallbackItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all
                  ${isActive
                    ? 'bg-[#003d82] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all
                ${isActive
                  ? 'bg-[#003d82] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}