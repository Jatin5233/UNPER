import { useState } from "react";
import { FileText, CheckCircle, Clock, XCircle, ArrowRight, Eye } from "lucide-react";

export function MigrationWorkflow() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const migrations = [
    {
      id: "F6-2025-MH-001234",
      applicantName: "Priya Deshmukh",
      epicNumber: "MHA8765432",
      oldConstituency: "Mumbai North (AC-145)",
      oldState: "Maharashtra",
      newConstituency: "Pune City (AC-154)",
      newState: "Maharashtra",
      appliedDate: "15-Dec-2025",
      status: "pending",
      currentStage: "CEO Approval Pending",
    },
    {
      id: "F6-2025-MH-001233",
      applicantName: "Amit Verma",
      epicNumber: "MHA7654321",
      oldConstituency: "Thane West (AC-132)",
      oldState: "Maharashtra",
      newConstituency: "Bangalore Central (AC-178)",
      newState: "Karnataka",
      appliedDate: "14-Dec-2025",
      status: "partial",
      currentStage: "Interstate Verification",
    },
    {
      id: "F6-2025-MH-001232",
      applicantName: "Sunita Patil",
      epicNumber: "MHA6543210",
      oldConstituency: "Nashik East (AC-167)",
      oldState: "Maharashtra",
      newConstituency: "Mumbai South (AC-148)",
      newState: "Maharashtra",
      appliedDate: "13-Dec-2025",
      status: "completed",
      currentStage: "Completed",
    },
    {
      id: "F6-2025-MH-001231",
      applicantName: "Rahul Joshi",
      epicNumber: "MHA5432109",
      oldConstituency: "Kolhapur North (AC-287)",
      oldState: "Maharashtra",
      newConstituency: "Pune Cantonment (AC-155)",
      newState: "Maharashtra",
      appliedDate: "12-Dec-2025",
      status: "pending",
      currentStage: "DEO Review Pending",
    },
  ];

  const filteredMigrations = selectedStatus === "all" 
    ? migrations 
    : migrations.filter(m => m.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "partial":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            Partially Approved
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Migration (Form-6) Workflow</h2>
          <p className="text-sm text-gray-600 mt-1">Review and process migration requests</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedStatus === "all"
                ? "bg-[#003d82] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({migrations.length})
          </button>
          <button
            onClick={() => setSelectedStatus("pending")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedStatus === "pending"
                ? "bg-[#003d82] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({migrations.filter(m => m.status === "pending").length})
          </button>
          <button
            onClick={() => setSelectedStatus("partial")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedStatus === "partial"
                ? "bg-[#003d82] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            In Progress ({migrations.filter(m => m.status === "partial").length})
          </button>
          <button
            onClick={() => setSelectedStatus("completed")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedStatus === "completed"
                ? "bg-[#003d82] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed ({migrations.filter(m => m.status === "completed").length})
          </button>
        </div>
      </div>

      {/* Migration Requests List */}
      <div className="space-y-4">
        {filteredMigrations.map((migration) => (
          <div key={migration.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#003d82]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{migration.applicantName}</h3>
                      {getStatusBadge(migration.status)}
                    </div>
                    <p className="text-sm text-gray-600">Application ID: {migration.id}</p>
                    <p className="text-xs text-gray-500 mt-1">EPIC: {migration.epicNumber} • Applied: {migration.appliedDate}</p>
                  </div>
                </div>
              </div>

              {/* Migration Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* From */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-xs text-red-600 font-medium mb-2">FROM (Old Constituency)</p>
                  <p className="text-sm font-semibold text-gray-900">{migration.oldConstituency}</p>
                  <p className="text-xs text-gray-600 mt-1">{migration.oldState}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>

                {/* To */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-600 font-medium mb-2">TO (New Constituency)</p>
                  <p className="text-sm font-semibold text-gray-900">{migration.newConstituency}</p>
                  <p className="text-xs text-gray-600 mt-1">{migration.newState}</p>
                </div>
              </div>

              {/* Current Stage */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-500 mb-1">Current Stage</p>
                <p className="text-sm font-medium text-gray-900">{migration.currentStage}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {migration.status === "pending" && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMigrations.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No migration requests found for the selected filter</p>
        </div>
      )}
    </div>
  );
}
