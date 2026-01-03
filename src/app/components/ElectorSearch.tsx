import { useState } from "react";
import { Search, User, MapPin, Phone, Mail, Calendar, FileText, Clock, CheckCircle } from "lucide-react";

export function ElectorSearch() {
  const [searchType, setSearchType] = useState("epic");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    setShowResult(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Elector Search & Profile</h2>
        <p className="text-sm text-gray-600 mt-1">Search and view detailed elector information</p>
      </div>

      {/* Search Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          {/* Search Type Selection */}
          <div className="flex gap-4">
            <button
              onClick={() => setSearchType("epic")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                searchType === "epic"
                  ? "bg-[#003d82] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              EPIC Number
            </button>
            <button
              onClick={() => setSearchType("name")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                searchType === "name"
                  ? "bg-[#003d82] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setSearchType("mobile")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                searchType === "mobile"
                  ? "bg-[#003d82] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mobile Number
            </button>
          </div>

          {/* Search Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === "epic"
                    ? "Enter EPIC number (e.g., ABC1234567)"
                    : searchType === "name"
                    ? "Enter elector name"
                    : "Enter mobile number"
                }
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Result */}
      {showResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#003d82] to-[#004999] text-white">
              <div className="flex items-start gap-6">
                {/* Photo */}
                <div className="w-32 h-32 bg-white rounded-lg overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Rajesh Kumar Sharma</h3>
                  <p className="text-blue-200 mt-1">राजेश कुमार शर्मा</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-blue-200">EPIC Number</p>
                      <p className="text-sm font-medium">ABC1234567</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">Age / Gender</p>
                      <p className="text-sm font-medium">42 Years / Male</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Father's Name</p>
                    <p className="text-sm text-gray-900 mt-1">Shyam Lal Sharma</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm text-gray-900 mt-1">15-Aug-1982</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile Number</p>
                    <p className="text-sm text-gray-900 mt-1">+91 98765-43210</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900 mt-1">rajesh.sharma@email.com</p>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Current Address</p>
                    <p className="text-sm text-gray-900 mt-1">
                      Flat 402, Building A, Shivaji Nagar,<br />
                      Pune, Maharashtra - 411005
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      फ्लैट 402, बिल्डिंग ए, शिवाजी नगर, पुणे, महाराष्ट्र - 411005
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Permanent Address</p>
                    <p className="text-sm text-gray-900 mt-1">
                      Same as Current Address
                    </p>
                  </div>
                </div>
              </div>

              {/* Electoral Details */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Electoral Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="text-sm text-gray-900 mt-1">Maharashtra</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">District</p>
                    <p className="text-sm text-gray-900 mt-1">Pune</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Assembly Constituency</p>
                    <p className="text-sm text-gray-900 mt-1">Pune City (AC-154)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Part Number</p>
                    <p className="text-sm text-gray-900 mt-1">Part-067</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Serial Number</p>
                    <p className="text-sm text-gray-900 mt-1">234</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Polling Station</p>
                    <p className="text-sm text-gray-900 mt-1">PS-067 (Shivaji School)</p>
                  </div>
                </div>
              </div>

              {/* Special Flags */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Special Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    General Elector
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Audit Trail & Actions */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors text-sm">
                  Edit Details
                </button>
                <button className="w-full px-4 py-2 bg-white text-[#003d82] border border-[#003d82] rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  View Documents
                </button>
                <button className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Print Details
                </button>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {[
                  { action: "Details verified", date: "12-Dec-2025", user: "BLO Pune-067" },
                  { action: "Mobile updated", date: "05-Nov-2025", user: "Self-service" },
                  { action: "Address updated", date: "20-Oct-2025", user: "BLO Pune-067" },
                  { action: "Profile created", date: "15-Jan-2020", user: "DEO Pune" },
                ].map((item, idx) => (
                  <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.date} • {item.user}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!showResult && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Enter search criteria and click Search to find elector details</p>
        </div>
      )}
    </div>
  );
}
