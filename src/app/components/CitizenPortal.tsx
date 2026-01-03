import { CheckCircle, MapPin, FileText, Download, User } from "lucide-react";

export function CitizenPortal() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Citizen Portal</h2>
        <p className="text-sm text-gray-600 mt-1">Self-service portal for electors</p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#003d82] to-[#004999] text-white rounded-lg p-8 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-12 h-12 text-[#003d82]" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Welcome, Rajesh Kumar Sharma</h3>
            <p className="text-blue-200 mb-4">EPIC Number: ABC1234567</p>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Your voter registration is active and verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-[#003d82]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Check Enrollment Status</h3>
          <p className="text-sm text-gray-600 mb-4">
            Verify your voter registration and enrollment details
          </p>
          <button className="text-sm text-[#003d82] font-medium hover:underline">
            View Status →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Find Polling Station</h3>
          <p className="text-sm text-gray-600 mb-4">
            Locate your assigned polling station and get directions
          </p>
          <button className="text-sm text-[#003d82] font-medium hover:underline">
            Find Station →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Download E-EPIC</h3>
          <p className="text-sm text-gray-600 mb-4">
            Download your digital voter ID card (e-EPIC)
          </p>
          <button className="text-sm text-[#003d82] font-medium hover:underline">
            Download →
          </button>
        </div>
      </div>

      {/* Enrollment Details */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Your Enrollment Details</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-900 mt-1">Rajesh Kumar Sharma</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name (Local Language)</p>
                  <p className="text-sm text-gray-900 mt-1">राजेश कुमार शर्मा</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Age / Gender</p>
                  <p className="text-sm text-gray-900 mt-1">42 Years / Male</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">EPIC Number</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">ABC1234567</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Electoral Information</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">State / District</p>
                  <p className="text-sm text-gray-900 mt-1">Maharashtra / Pune</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assembly Constituency</p>
                  <p className="text-sm text-gray-900 mt-1">Pune City (AC-154)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Polling Station</p>
                  <p className="text-sm text-gray-900 mt-1">PS-067 - Shivaji School</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Part Number / Serial Number</p>
                  <p className="text-sm text-gray-900 mt-1">Part-067 / Serial-234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Polling Station Info */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#003d82]" />
            <h3 className="font-semibold text-gray-900">Your Polling Station</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                Government Primary School, Shivaji Nagar
              </h4>
              <p className="text-sm text-gray-600 mb-1">शासकीय प्राथमिक शाळा, शिवाजी नगर</p>
              <p className="text-sm text-gray-600 mb-4">
                Shivaji Nagar, Pune - 411005, Maharashtra
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">Wheelchair accessible</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600">Parking available</span>
                </div>
              </div>

              <button className="px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors text-sm">
                Get Directions
              </button>
            </div>

            <div className="w-full md:w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Map Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form-6 Application Status */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#003d82]" />
            <h3 className="font-semibold text-gray-900">Migration Application Status</h3>
          </div>
        </div>

        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">No active migration applications</p>
          <p className="text-sm text-gray-500">
            You don't have any pending Form-6 (migration) applications
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Carry your EPIC card or a valid ID proof to the polling station on election day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>You can download your e-EPIC card from this portal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>If you have moved to a new address, apply for migration using Form-6</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Report any discrepancies in your details to your local BLO</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
