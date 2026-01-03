import { Users, TrendingUp, AlertTriangle, Activity, MapPin, FileText } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function NationalDashboard() {
  const stateData = [
    { state: "Uttar Pradesh", electors: 15023456, short: "UP" },
    { state: "Maharashtra", electors: 8876543, short: "MH" },
    { state: "West Bengal", electors: 7234567, short: "WB" },
    { state: "Bihar", electors: 6987654, short: "BR" },
    { state: "Tamil Nadu", electors: 6123456, short: "TN" },
    { state: "Karnataka", electors: 4987654, short: "KA" },
    { state: "Gujarat", electors: 4654321, short: "GJ" },
    { state: "Rajasthan", electors: 4321098, short: "RJ" },
  ];

  const migrationTrend = [
    { month: "Jan", migrations: 2345 },
    { month: "Feb", migrations: 2678 },
    { month: "Mar", migrations: 3421 },
    { month: "Apr", migrations: 4123 },
    { month: "May", migrations: 3876 },
    { month: "Jun", migrations: 4567 },
  ];

  const categoryData = [
    { name: "General", value: 82, color: "#003d82" },
    { name: "PwD", value: 3, color: "#f59e0b" },
    { name: "Service Voters", value: 2, color: "#10b981" },
    { name: "Overseas", value: 1, color: "#ef4444" },
    { name: "Others", value: 12, color: "#8b5cf6" },
  ];

  const totalElectors = stateData.reduce((sum, s) => sum + s.electors, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">National Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Comprehensive view of electoral roll across India</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Registered Electors</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {(totalElectors / 10000000).toFixed(1)}Cr
              </p>
              <p className="text-xs text-gray-500 mt-1">All India</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#003d82]" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Migrations</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">12,456</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                -8% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Duplicate Alerts</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">3,247</p>
              <p className="text-xs text-orange-600 mt-1">Requires attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Polling Stations</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">10.5L</p>
              <p className="text-xs text-gray-500 mt-1">Nationwide</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State-wise Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">State-wise Elector Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="short" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                formatter={(value: number) => [(value / 1000000).toFixed(2) + 'M', 'Electors']}
              />
              <Bar dataKey="electors" fill="#003d82" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Elector Categories (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Migration Trend */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Monthly Migration Trend (Form-6)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={migrationTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="migrations" 
              stroke="#003d82" 
              strokeWidth={3}
              dot={{ fill: '#003d82', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#003d82]" />
          <h3 className="font-semibold text-gray-900">Recent Audit Activity Summary</h3>
        </div>
        <div className="space-y-3">
          {[
            { action: "Migration approved", user: "CEO Maharashtra", time: "5 minutes ago", badge: "success" },
            { action: "Bulk update processed", user: "DEO Mumbai", time: "15 minutes ago", badge: "info" },
            { action: "Duplicate flagged", user: "System Auto-check", time: "32 minutes ago", badge: "warning" },
            { action: "New elector added", user: "BLO Pune-001", time: "1 hour ago", badge: "success" },
            { action: "Form-6 rejected", user: "RO Thane", time: "2 hours ago", badge: "error" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <span className={`
                  px-2 py-1 rounded text-xs
                  ${activity.badge === 'success' ? 'bg-green-100 text-green-700' : ''}
                  ${activity.badge === 'info' ? 'bg-blue-100 text-blue-700' : ''}
                  ${activity.badge === 'warning' ? 'bg-orange-100 text-orange-700' : ''}
                  ${activity.badge === 'error' ? 'bg-red-100 text-red-700' : ''}
                `}>
                  {activity.action}
                </span>
                <span className="text-sm text-gray-600">{activity.user}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
