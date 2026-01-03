import { 
  LayoutDashboard, 
  Search, 
  Users, 
  FileText, 
  MapPin, 
  Activity,
  ChevronRight 
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: string;
}

export function Sidebar({ activeView, onViewChange, userRole }: SidebarProps) {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (userRole === 'CEC' || userRole === 'EC') {
      return [
        ...baseItems,
        { id: 'elector-search', label: 'Elector Search', icon: Search },
        { id: 'migration', label: 'Migration Workflow', icon: FileText },
        { id: 'polling-stations', label: 'Polling Stations', icon: MapPin },
        { id: 'audit-log', label: 'Audit & Activity', icon: Activity },
      ];
    }

    if (userRole === 'CEO' || userRole === 'DEO' || userRole === 'RO') {
      return [
        ...baseItems,
        { id: 'elector-search', label: 'Elector Search', icon: Search },
        { id: 'migration', label: 'Migration Workflow', icon: FileText },
        { id: 'polling-stations', label: 'Polling Stations', icon: MapPin },
        { id: 'audit-log', label: 'Audit & Activity', icon: Activity },
      ];
    }

    if (userRole === 'BLO') {
      return [
        ...baseItems,
        { id: 'elector-search', label: 'Elector Search', icon: Search },
        { id: 'blo-entry', label: 'Data Entry', icon: Users },
        { id: 'migration', label: 'Migration Workflow', icon: FileText },
      ];
    }

    if (userRole === 'Citizen') {
      return [
        { id: 'citizen-portal', label: 'My Dashboard', icon: LayoutDashboard },
        { id: 'elector-search', label: 'Check Status', icon: Search },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
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