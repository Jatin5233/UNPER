import { 
  Users, FileText, CheckCircle, XCircle, Clock, Eye, 
  AlertCircle, TrendingUp, RefreshCw 
} from "lucide-react";
import { useERODashboard, ERODashboardData } from "../../hooks/useERODashboard";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  trend?: string;
}

function MetricCard({ title, value, subtitle, icon, bgColor, iconColor, trend }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{value}</p>
          {trend ? (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  cards: ERODashboardData['cards'];
  formatNumber: (num: number) => string;
}

function SummaryCards({ cards, formatNumber }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Registered Electors"
        value={formatNumber(cards.totalElectors)}
        subtitle="Under jurisdiction"
        icon={<Users className="w-6 h-6" />}
        bgColor="bg-blue-100"
        iconColor="text-[#003d82]"
      />
      
      <MetricCard
        title="Pending Applications"
        value={cards.pendingApplications}
        subtitle="Awaiting review"
        icon={<Clock className="w-6 h-6" />}
        bgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
      
      <MetricCard
        title="Today's Verifications"
        value={cards.todaysVerifications}
        subtitle="Completed today"
        icon={<CheckCircle className="w-6 h-6" />}
        bgColor="bg-green-100"
        iconColor="text-green-600"
        trend="+12% from yesterday"
      />
      
      <MetricCard
        title="Rejected Applications"
        value={cards.rejectedApplications}
        subtitle="This month"
        icon={<XCircle className="w-6 h-6" />}
        bgColor="bg-red-100"
        iconColor="text-red-600"
      />
    </div>
  );
}

interface VerificationQueueProps {
  queue: ERODashboardData['verificationQueue'];
  actionLoading: string | null;
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetails: (id: string) => void;
}

function VerificationQueue({ queue, actionLoading, onVerify, onReject, onViewDetails }: VerificationQueueProps) {
  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700"
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Verification Queue</h3>
        <p className="text-sm text-gray-600 mt-1">Applications awaiting your review</p>
      </div>
      
      {queue.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {queue.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{item.applicantName}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(item.priority)}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Form: <strong>{item.formType}</strong></p>
                    <p>Submitted: {item.submittedDate}</p>
                    <p className="col-span-2">Constituency: {item.constituency}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onViewDetails(item.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => onVerify(item.id)}
                    disabled={actionLoading === item.id}
                    className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {actionLoading === item.id ? "..." : "Verify"}
                  </button>
                  <button
                    onClick={() => onReject(item.id)}
                    disabled={actionLoading === item.id}
                    className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-gray-500">
          <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p>All caught up! No pending verifications.</p>
        </div>
      )}
    </div>
  );
}

interface RecentApplicationsProps {
  applications: ERODashboardData['recentApplications'];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

function RecentApplications({ applications, selectedFilter, onFilterChange }: RecentApplicationsProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: "bg-orange-100", text: "text-orange-700", icon: <Clock className="w-3 h-3" /> },
      verified: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle className="w-3 h-3" /> },
      rejected: { bg: "bg-red-100", text: "text-red-700", icon: <XCircle className="w-3 h-3" /> },
    };
    const config = statusConfig[status.toLowerCase() as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
        {config.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Recent Applications</h3>
            <p className="text-sm text-gray-600 mt-1">Latest Form-6, Form-7, Form-8 submissions</p>
          </div>
          
          <div className="flex gap-2">
            {["all", "pending", "verified", "rejected"].map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedFilter === filter
                    ? "bg-[#003d82] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constituency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.applicantName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.formType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.constituency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.applicationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(app.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center text-gray-500">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p>No applications found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}

interface ConstituencyStatsProps {
  stats: ERODashboardData['constituencyStats'];
}

function ConstituencyStats({ stats }: ConstituencyStatsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Constituency Statistics</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constituency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Electors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stats.map((stat, idx) => {
              const total = stat.verified + stat.pending;
              const percentage = total > 0 ? Math.round((stat.verified / total) * 100) : 0;
              
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stat.constituency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stat.totalElectors.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      {stat.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {stat.verified}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{percentage}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ERODashboard() {
  const {
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
    refreshDashboard,
  } = useERODashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 flex items-center gap-2">
          <Clock className="w-5 h-5 animate-spin" />
          Loading ERO dashboard...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold">Failed to load dashboard</p>
          <button
            onClick={refreshDashboard}
            className="mt-4 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">ERO Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">Electoral Registration Officer - Application Management</p>
        </div>
        
        <button
          onClick={refreshDashboard}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards cards={data.cards} formatNumber={formatNumber} />

      {/* Verification Queue */}
      <VerificationQueue
        queue={data.verificationQueue}
        actionLoading={actionLoading}
        onVerify={handleVerify}
        onReject={handleReject}
        onViewDetails={handleViewDetails}
      />

      {/* Recent Applications */}
      <RecentApplications
        applications={filteredApplications}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Constituency Stats */}
      <ConstituencyStats stats={data.constituencyStats} />
    </div>
  );
}