import { useState } from "react";
import { Activity, Filter, Download, Calendar, User, FileText } from "lucide-react";

export function AuditLog() {
  const [filterUser, setFilterUser] = useState("all");
  const [filterAction, setFilterAction] = useState("all");

  const activities = [
    {
      id: "AUD-2025-001234",
      timestamp: "02-Jan-2026 14:35:22",
      user: "CEO Maharashtra",
      userId: "CEO-MH-001",
      action: "Migration Approved",
      actionType: "approval",
      details: "Form-6 application F6-2025-MH-001232 approved for Sunita Patil",
      ipAddress: "103.45.67.89",
      location: "Mumbai, Maharashtra",
    },
    {
      id: "AUD-2025-001233",
      timestamp: "02-Jan-2026 14:12:45",
      user: "DEO Mumbai",
      userId: "DEO-MH-MUM-001",
      action: "Bulk Update Processed",
      actionType: "update",
      details: "Updated 234 elector records in Mumbai North constituency",
      ipAddress: "103.45.67.90",
      location: "Mumbai, Maharashtra",
    },
    {
      id: "AUD-2025-001232",
      timestamp: "02-Jan-2026 13:58:11",
      user: "System Auto-check",
      userId: "SYSTEM",
      action: "Duplicate Flagged",
      actionType: "alert",
      details: "Potential duplicate found: EPIC MHA8765432 and MHA8765433",
      ipAddress: "System",
      location: "Automated Process",
    },
    {
      id: "AUD-2025-001231",
      timestamp: "02-Jan-2026 13:42:30",
      user: "BLO Pune-001",
      userId: "BLO-MH-PUN-001",
      action: "New Elector Added",
      actionType: "create",
      details: "New elector registration for Amit Kumar Verma (EPIC: MHA9876543)",
      ipAddress: "103.45.67.91",
      location: "Pune, Maharashtra",
    },
    {
      id: "AUD-2025-001230",
      timestamp: "02-Jan-2026 12:15:18",
      user: "RO Thane",
      userId: "RO-MH-THA-001",
      action: "Form-6 Rejected",
      actionType: "rejection",
      details: "Migration application F6-2025-MH-001225 rejected - Incomplete documentation",
      ipAddress: "103.45.67.92",
      location: "Thane, Maharashtra",
    },
    {
      id: "AUD-2025-001229",
      timestamp: "02-Jan-2026 11:30:45",
      user: "BLO Nagpur-045",
      userId: "BLO-MH-NAG-045",
      action: "Elector Details Updated",
      actionType: "update",
      details: "Updated address for EPIC MHA7654321",
      ipAddress: "103.45.67.93",
      location: "Nagpur, Maharashtra",
    },
    {
      id: "AUD-2025-001228",
      timestamp: "02-Jan-2026 10:45:12",
      user: "DEO Pune",
      userId: "DEO-MH-PUN-001",
      action: "Verification Completed",
      actionType: "verification",
      details: "Completed verification of 156 pending records in Pune district",
      ipAddress: "103.45.67.94",
      location: "Pune, Maharashtra",
    },
  ];

  const getActionBadge = (actionType: string) => {
    switch (actionType) {
      case "approval":
        return "bg-green-100 text-green-700";
      case "rejection":
        return "bg-red-100 text-red-700";
      case "create":
        return "bg-blue-100 text-blue-700";
      case "update":
        return "bg-purple-100 text-purple-700";
      case "alert":
        return "bg-orange-100 text-orange-700";
      case "verification":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Audit & Activity Log</h2>
          <p className="text-sm text-gray-600 mt-1">System activity and administrative actions tracking</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#003d82]" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Role
            </label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
            >
              <option value="all">All Users</option>
              <option value="ceo">CEO</option>
              <option value="deo">DEO</option>
              <option value="ro">RO</option>
              <option value="blo">BLO</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Type
            </label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
            >
              <option value="all">All Actions</option>
              <option value="approval">Approvals</option>
              <option value="rejection">Rejections</option>
              <option value="create">New Records</option>
              <option value="update">Updates</option>
              <option value="alert">Alerts</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#003d82]" />
            <h3 className="font-semibold text-gray-900">Activity Timeline</h3>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Timeline Indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionBadge(activity.actionType)}`}>
                    {activity.actionType === "create" && <FileText className="w-5 h-5" />}
                    {activity.actionType === "update" && <FileText className="w-5 h-5" />}
                    {activity.actionType === "approval" && <Activity className="w-5 h-5" />}
                    {activity.actionType === "rejection" && <Activity className="w-5 h-5" />}
                    {activity.actionType === "alert" && <Activity className="w-5 h-5" />}
                    {activity.actionType === "verification" && <Activity className="w-5 h-5" />}
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{activity.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${getActionBadge(activity.actionType)}`}>
                      {activity.actionType.charAt(0).toUpperCase() + activity.actionType.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Timestamp</p>
                      <p className="text-sm text-gray-900 mt-1">{activity.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">User</p>
                      <p className="text-sm text-gray-900 mt-1">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.userId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">IP Address</p>
                      <p className="text-sm text-gray-900 mt-1">{activity.ipAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm text-gray-900 mt-1">{activity.location}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Audit ID: {activity.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 7 of 1,234 activities</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#003d82] text-white rounded-lg text-sm hover:bg-[#002d62] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
