import { useState } from "react";
import { Activity, Filter, Download, Calendar, User, FileText, AlertCircle } from "lucide-react";

// Dummy data for judges to evaluate
const dummyAuditLogs = [
  {
    id: "AUD-001",
    action: "Voter Migration Approved",
    details: "Booth No. 12 migration from Koregaon Park to Andheri West completed",
    timestamp: "2024-03-15 10:30:45",
    user: "Officer Rajesh Kumar",
    userRole: "RO - District Officer",
    module: "Voter Migration",
    status: "success",
    ipAddress: "192.168.1.105",
    recordId: "VOT-789456"
  },
  {
    id: "AUD-002",
    action: "Form-6 Rejected",
    details: "Duplicate voter registration detected in Andheri West constituency",
    timestamp: "2024-03-15 09:15:22",
    user: "Clerk Priya Sharma",
    userRole: "BLO - Booth Level Officer",
    module: "Voter Registration",
    status: "failure",
    ipAddress: "192.168.1.108",
    recordId: "FORM-6-12345"
  },
  {
    id: "AUD-003",
    action: "Bulk Elector Update",
    details: "500 voter records updated in Koregaon Park polling stations",
    timestamp: "2024-03-14 16:45:33",
    user: "Admin System",
    userRole: "System Automation",
    module: "Data Management",
    status: "success",
    ipAddress: "10.0.0.1",
    recordId: "BATCH-2024-003"
  },
  {
    id: "AUD-004",
    action: "Polling Station Assigned",
    details: "Assigned Andheri West Primary School to Booth Officer Ravi Patil",
    timestamp: "2024-03-14 14:20:18",
    user: "Commissioner Mehta",
    userRole: "CEO - Chief Electoral Officer",
    module: "Polling Station Management",
    status: "success",
    ipAddress: "192.168.1.101",
    recordId: "PS-AND-WEST-001"
  },
  {
    id: "AUD-005",
    action: "Result Data Uploaded",
    details: "Electronic Voting Machine results uploaded for Koregaon Park Municipal Hall",
    timestamp: "2024-03-14 11:05:59",
    user: "Officer Neha Singh",
    userRole: "RO - Returning Officer",
    module: "Result Declaration",
    status: "success",
    ipAddress: "192.168.1.110",
    recordId: "RESULT-KP-005"
  },
  {
    id: "AUD-006",
    action: "Security Alert",
    details: "Unauthorized access attempt detected from IP 203.0.113.25",
    timestamp: "2024-03-14 08:40:12",
    user: "Security System",
    userRole: "System Monitor",
    module: "Security",
    status: "alert",
    ipAddress: "N/A",
    recordId: "SEC-ALERT-789"
  },
  {
    id: "AUD-007",
    action: "Voter List Export",
    details: "Complete electoral roll exported for Andheri West constituency",
    timestamp: "2024-03-13 17:30:47",
    user: "Data Officer Amit Patel",
    userRole: "Data Manager",
    module: "Reports",
    status: "success",
    ipAddress: "192.168.1.115",
    recordId: "EXPORT-2024-015"
  },
  {
    id: "AUD-008",
    action: "Nomination Scrutiny",
    details: "Candidate nomination papers scrutinized for Ward 7, Koregaon Park",
    timestamp: "2024-03-13 15:10:33",
    user: "Scrutiny Officer Desai",
    userRole: "Scrutiny Officer",
    module: "Candidate Nomination",
    status: "success",
    ipAddress: "192.168.1.120",
    recordId: "NOM-KP-007"
  }
];

export function AuditLog() {
  const [filterAction, setFilterAction] = useState("all");
  const [filterModule, setFilterModule] = useState("all");
  const [dateRange, setDateRange] = useState("");
  const [logs, setLogs] = useState(dummyAuditLogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case "voter migration approved":
      case "approval":
        return "bg-green-100 text-green-700";
      case "form-6 rejected":
      case "rejection":
        return "bg-red-100 text-red-700";
      case "new elector added":
      case "create":
        return "bg-blue-100 text-blue-700";
      case "bulk elector update":
      case "update":
        return "bg-purple-100 text-purple-700";
      case "security alert":
      case "alert":
        return "bg-orange-100 text-orange-700";
      case "verification completed":
      case "verification":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const applyFilters = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredLogs = [...dummyAuditLogs];
      
      if (filterAction !== "all") {
        filteredLogs = filteredLogs.filter(log => 
          log.action.toLowerCase().includes(filterAction.toLowerCase()) ||
          (filterAction === "approval" && log.action.includes("Approved")) ||
          (filterAction === "rejection" && log.action.includes("Rejected"))
        );
      }
      
      if (dateRange) {
        // Simple date filtering for demo
        filteredLogs = filteredLogs.filter(log => 
          log.timestamp.startsWith(dateRange)
        );
      }
      
      setLogs(filteredLogs);
      setLoading(false);
      
      if (filteredLogs.length === 0) {
        setError("No audit logs found matching the selected criteria");
      }
    }, 500);
  };

  const clearFilters = () => {
    setFilterAction("all");
    setFilterModule("all");
    setDateRange("");
    setLogs(dummyAuditLogs);
    setError(null);
  };

  const exportReport = () => {
    alert("Exporting audit report...\n\nThis would generate a CSV file with all audit logs for download.");
    // In real implementation, this would trigger a file download
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Audit & Activity Log</h2>
          <p className="text-sm text-gray-600 mt-1">
            System activity and administrative actions tracking - <span className="font-semibold text-[#003d82]">DEMO MODE</span>
          </p>
        </div>

        <button 
          onClick={exportReport}
          className="flex items-center gap-2 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-blue-800 font-medium">Demo Mode Active</p>
            <p className="text-blue-700 text-sm mt-1">
              This dashboard is showing sample data for evaluation purposes. All audit logs are simulated.
            </p>
          </div>
        </div>
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
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
              />
            </div>
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
              <option value="alert">Security Alerts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Role
            </label>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="RO">Returning Officer</option>
              <option value="BLO">Booth Level Officer</option>
              <option value="CEO">Chief Electoral Officer</option>
              <option value="system">System Actions</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button 
              onClick={applyFilters}
              className="w-full px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors"
            >
              Apply Filters
            </button>
            <button 
              onClick={clearFilters}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Activity Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#003d82]" />
            <h3 className="font-semibold text-gray-900">Activity Timeline</h3>
            <span className="text-sm text-gray-500 ml-auto">Total: {logs.length} entries</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#003d82] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Loading audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No audit logs found for the selected filters</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Timeline Indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionBadge(log.action)}`}>
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{log.action}</h4>
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getActionBadge(log.action)}`}>
                        {log.status === "success" ? "Success" : 
                         log.status === "failure" ? "Failure" : 
                         log.status === "alert" ? "Alert" : "Info"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500">Timestamp</p>
                        <p className="text-sm text-gray-900 mt-1">{log.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">User</p>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-900">{log.user}</p>
                            <p className="text-xs text-gray-500">{log.userRole}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Module</p>
                        <div className="flex items-center gap-2 mt-1">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-900">{log.module}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">IP Address</p>
                        <p className="text-sm text-gray-900 mt-1 font-mono">{log.ipAddress}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 font-mono">Audit ID: {log.id}</p>
                      {log.recordId && (
                        <p className="text-xs text-gray-500 font-mono">Record ID: {log.recordId}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {logs.length} of {logs.length} activities (Demo Mode)
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-white transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Total Activities</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{logs.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Successful Actions</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">
            {logs.filter(l => l.status === "success").length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">System Users</p>
          <p className="text-2xl font-semibold text-blue-600 mt-1">5</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">Just Now</p>
        </div>
      </div>
    </div>
  );
}