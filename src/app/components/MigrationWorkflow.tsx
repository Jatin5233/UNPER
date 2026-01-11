import { 
  FileText, CheckCircle, Clock, XCircle, ArrowRight, Eye, 
  AlertCircle, MapPin, Building2, User, Phone, Mail, Calendar 
} from "lucide-react";
import { useMigrationWorkflow, Migration } from "../../hooks/useMigrationWorkflow";

const getStatusBadge = (status: string, isInterstate: boolean) => {
  const badges = [];
  
  if (status === "pending") {
    badges.push(
      <span key="status" className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
        <Clock className="w-3 h-3" />
        Pending Review
      </span>
    );
  } else if (status === "partial") {
    badges.push(
      <span key="status" className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        <Clock className="w-3 h-3" />
        In Progress
      </span>
    );
  } else if (status === "completed") {
    badges.push(
      <span key="status" className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
        <CheckCircle className="w-3 h-3" />
        Completed
      </span>
    );
  } else if (status === "rejected") {
    badges.push(
      <span key="status" className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
        <XCircle className="w-3 h-3" />
        Rejected
      </span>
    );
  }
  
  if (isInterstate) {
    badges.push(
      <span key="interstate" className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
        Interstate
      </span>
    );
  }
  
  return <div className="flex items-center gap-2 flex-wrap">{badges}</div>;
};

const getGenderIcon = (gender: string) => {
  if (gender === "M") return "👨";
  if (gender === "F") return "👩";
  return "👤";
};

interface MigrationCardProps {
  migration: Migration;
  isExpanded: boolean;
  actionLoading: string | null;
  userRole: string;
  showApproveButton: boolean;
  showRejectButton: boolean;
  onToggleExpand: () => void;
  onApprove: (migrationId: string, migrationStatus: string) => void;
  onReject: (migrationId: string) => void;
  getApproveButtonText: (migrationStatus: string) => string;
}

function MigrationCard({
  migration,
  isExpanded,
  actionLoading,
  userRole,
  showApproveButton,
  showRejectButton,
  onToggleExpand,
  onApprove,
  onReject,
  getApproveButtonText,
}: MigrationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#003d82]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="font-semibold text-lg text-gray-900">
                  {getGenderIcon(migration.gender)} {migration.applicantName}
                </h3>
                {getStatusBadge(migration.status, migration.isInterstate)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>EPIC: <strong>{migration.epicNumber}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Applied: {migration.appliedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{migration.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{migration.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Migration Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-4">
          {/* FROM Location */}
          <div className="lg:col-span-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-600 font-medium uppercase">From (Current)</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{migration.oldConstituency}</p>
                <p className="text-xs text-gray-600">{migration.oldDistrict}, {migration.oldState}</p>
              </div>
              <div className="pt-2 border-t border-red-200">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                  <Building2 className="w-3 h-3 flex-shrink-0" />
                  <span className="font-medium">{migration.oldPollingStation}</span>
                </div>
                <p className="text-xs text-gray-500">Part: {migration.oldPartNumber}</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>

          {/* TO Location */}
          <div className="lg:col-span-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-green-600 font-medium uppercase">To (New)</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{migration.newConstituency}</p>
                <p className="text-xs text-gray-600">{migration.newDistrict}, {migration.newState}</p>
              </div>
              <div className="pt-2 border-t border-green-200">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                  <Building2 className="w-3 h-3 flex-shrink-0" />
                  <span className="font-medium">{migration.newPollingStation}</span>
                </div>
                <p className="text-xs text-gray-500">Part: {migration.newPartNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Stage */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Current Stage</p>
              <p className="text-sm font-medium text-gray-900">{migration.currentStage}</p>
            </div>
            {migration.completedDate && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Completed On</p>
                <p className="text-xs font-medium text-green-600">{migration.completedDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Additional Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-medium mb-1">Personal Information</p>
                <p className="text-xs text-gray-500">Age: {migration.age} years</p>
                <p className="text-xs text-gray-500">DOB: {migration.dateOfBirth}</p>
                <p className="text-xs text-gray-500">{migration.relationType}: {migration.relationName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium mb-1">Elector Status</p>
                <p className="text-xs text-gray-500">ID: {migration.electorIdNumber}</p>
                <p className="text-xs text-gray-500">Status: {migration.electorStatus}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
  <button 
    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
    onClick={onToggleExpand}
  >
    <Eye className="w-4 h-4" />
    {isExpanded ? "Hide" : "Show"} Details
  </button>
  {userRole === 'RO' && (
    <div className="flex gap-2 flex-wrap">
      {/* Source RO Status */}
      {migration.userIsSourceRo && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
          migration.sourceRoApproved 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-orange-50 border border-orange-200 text-orange-700'
        }`}>
          {migration.sourceRoApproved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>You approved (Source RO)</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              <span>Your approval needed (Source RO)</span>
            </>
          )}
        </div>
      )}
          
          {/* Destination RO Status */}
      {migration.userIsDestinationRo && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
          migration.destinationRoApproved 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : migration.sourceRoApproved
            ? 'bg-orange-50 border border-orange-200 text-orange-700'
            : 'bg-gray-50 border border-gray-200 text-gray-600'
        }`}>
          {migration.destinationRoApproved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>You approved (Destination RO)</span>
            </>
          ) : migration.sourceRoApproved ? (
            <>
              <Clock className="w-4 h-4" />
              <span>Your approval needed (Destination RO)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Awaiting source RO approval first</span>
            </>
          )}
        </div>
      )}
    </div>
  )}
  
  {/* Action buttons */}
  {(migration.status === "pending" || migration.status === "partial") && (
    <>
      {/* RO Approval Buttons */}
      {userRole === 'RO' && (migration.canApproveAsSource || migration.canApproveAsDestination) && (
        <button 
          onClick={() => onApprove(migration.id, migration.migrationStatus)}
          disabled={actionLoading === migration.id}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <CheckCircle className="w-4 h-4" />
          {actionLoading === migration.id ? "Processing..." : 
            migration.canApproveAsSource ? "Approve as Source RO" : "Approve as Destination RO"}
        </button>
      )}
      
      {/* CEO/DEO buttons (existing logic) */}
      {showApproveButton && userRole !== 'RO' && (
        <button 
          onClick={() => onApprove(migration.id, migration.migrationStatus)}
          disabled={actionLoading === migration.id}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <CheckCircle className="w-4 h-4" />
          {actionLoading === migration.id ? "Processing..." : getApproveButtonText(migration.migrationStatus)}
        </button>
      )}
      
      {/* Reject button */}
      {(showRejectButton || (userRole === 'RO' && (migration.userIsSourceRo || migration.userIsDestinationRo))) && (
        <button 
          onClick={() => onReject(migration.id)}
          disabled={actionLoading === migration.id}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </button>
      )}
      
      {/* View-only message */}
      {!showApproveButton && !showRejectButton && userRole !== 'RO' && (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>View-only access for {userRole}</span>
        </div>
      )}
    </>
  )}
</div>
      </div>
    </div>
  );
}

export function MigrationWorkflow() {
  const {
    data,
    loading,
    selectedStatus,
    actionLoading,
    expandedMigration,
    userRole,
    hasViewAccess,
    showApproveButton,
    showRejectButton,
    filteredMigrations,
    handleStatusChange,
    handleApprove,
    handleReject,
    toggleExpand,
    getApproveButtonText,
  } = useMigrationWorkflow();

  // Access denied
  if (!hasViewAccess) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold text-lg">Access Denied</p>
          <p className="text-gray-600 text-sm mt-2">
            You don't have permission to view the migration workflow.
          </p>
          <p className="text-xs text-gray-500 mt-1">Current Role: {userRole}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 flex items-center gap-2">
          <Clock className="w-5 h-5 animate-spin" />
          Loading migration workflow...
        </div>
      </div>
    );
  }

  // Error state
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load migrations. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Migration (Form-6) Workflow</h2>
          <p className="text-sm text-gray-600 mt-1">Review and process elector migration requests</p>
          <p className="text-xs text-gray-500 mt-1">
            Role: <strong>{userRole}</strong> {!showApproveButton && !showRejectButton && '(View Only)'}
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "all", label: "All", count: data.statusCounts.all },
            { key: "pending", label: "Pending", count: data.statusCounts.pending },
            { key: "partial", label: "In Progress", count: data.statusCounts.partial },
            { key: "completed", label: "Completed", count: data.statusCounts.completed },
            { key: "rejected", label: "Rejected", count: data.statusCounts.rejected }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => handleStatusChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === key
                  ? "bg-[#003d82] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Migration Cards */}
      <div className="space-y-4">
        {filteredMigrations.map((migration) => (
          <MigrationCard
            key={migration.id}
            migration={migration}
            isExpanded={expandedMigration === migration.id}
            actionLoading={actionLoading}
            userRole={userRole}
            showApproveButton={showApproveButton}
            showRejectButton={showRejectButton}
            onToggleExpand={() => toggleExpand(migration.id)}
            onApprove={handleApprove}
            onReject={handleReject}
            getApproveButtonText={getApproveButtonText}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredMigrations.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium text-lg">No migration requests found</p>
        </div>
      )}
    </div>
  );
}