import { Users, FileText, MapPin, Clock, ChevronDown, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useStateDashboard, StateDashboardData } from "../../hooks/useStateDashboardData";

interface FilterHeaderProps {
  states: string[];
  districts: string[];
  selectedState: string;
  selectedDistrict: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  onApplyFilters: () => void;
}

function FilterHeader({
  states,
  districts,
  selectedState,
  selectedDistrict,
  onStateChange,
  onDistrictChange,
  onApplyFilters,
}: FilterHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">State & District Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Regional electoral roll management</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent appearance-none bg-white"
          >
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent appearance-none bg-white"
          >
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button 
          onClick={onApplyFilters}
          className="flex items-center gap-2 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002d62] transition-colors"
        >
          <Filter className="w-4 h-4" />
          Apply Filters
        </button>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  subtitleColor?: string;
}

function MetricCard({ title, value, subtitle, icon, bgColor, iconColor, subtitleColor = "text-gray-500" }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
          <p className={`text-xs ${subtitleColor} mt-1`}>{subtitle}</p>
        </div>
        <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  cards: StateDashboardData['cards'];
  selectedState: string;
  selectedDistrict: string;
  formatNumber: (num: number) => string;
}

function SummaryCards({ cards, selectedState, selectedDistrict, formatNumber }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Electors"
        value={formatNumber(cards.totalElectors)}
        subtitle={selectedDistrict === "All" ? selectedState : selectedDistrict}
        icon={<Users className="w-5 h-5" />}
        bgColor="bg-blue-100"
        iconColor="text-[#003d82]"
      />

      <MetricCard
        title="Pending Form-6"
        value={cards.pendingMigrations}
        subtitle="Awaiting approval"
        icon={<FileText className="w-5 h-5" />}
        bgColor="bg-orange-100"
        iconColor="text-orange-600"
        subtitleColor="text-orange-600"
      />

      <MetricCard
        title="Polling Stations"
        value={cards.pollingStations.toLocaleString()}
        subtitle="Active"
        icon={<MapPin className="w-5 h-5" />}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />

      <MetricCard
        title="Verification Queue"
        value={cards.verificationQueue}
        subtitle="In progress"
        icon={<Clock className="w-5 h-5" />}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
        subtitleColor="text-blue-600"
      />
    </div>
  );
}

interface DistrictChartProps {
  data: StateDashboardData['districtData'];
  formatNumber: (num: number) => string;
}

function DistrictChart({ data, formatNumber }: DistrictChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.district}</p>
          <p className="text-sm text-gray-600">
            Electors: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-orange-600">
            Pending: <span className="font-semibold">{payload[0].payload.pending}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">District-wise Elector Count</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="district" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="electors" fill="#003d82" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ConstituencyTableProps {
  constituencies: StateDashboardData['constituencies'];
}

function ConstituencyTable({ constituencies }: ConstituencyTableProps) {
  if (constituencies.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Constituency-wise Statistics</h3>
        </div>
        <div className="py-12 text-center text-gray-500">
          No constituency data available for the selected filters
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Constituency-wise Statistics</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Constituency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                District
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Electors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pending
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Part Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {constituencies.map((constituency, idx) => {
              const total = constituency.verified + constituency.pending;
              const percentage = total > 0 ? Math.round((constituency.verified / total) * 100) : 0;
              
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{constituency.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{constituency.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{constituency.electors.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                      {constituency.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {constituency.verified}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {constituency.station}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">
                        {percentage}%
                      </span>
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

export function StateDashboard() {
  const {
    data,
    loading,
    selectedState,
    selectedDistrict,
    handleStateChange,
    handleDistrictChange,
    applyFilters,
    formatNumber,
  } = useStateDashboard();

  if (loading) {
    return <div className="text-gray-500">Loading state dashboard...</div>;
  }

  if (!data) {
    return <div className="text-red-500">Failed to load dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <FilterHeader
        states={data.states}
        districts={data.districts}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        onStateChange={handleStateChange}
        onDistrictChange={handleDistrictChange}
        onApplyFilters={applyFilters}
      />

      {/* Summary Cards */}
      <SummaryCards
        cards={data.cards}
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        formatNumber={formatNumber}
      />

      {/* District Comparison Chart - Only show when viewing entire state */}
      {selectedDistrict === "All" && data.districtData.length > 0 && (
        <DistrictChart data={data.districtData} formatNumber={formatNumber} />
      )}

      {/* Constituency Details Table */}
      <ConstituencyTable constituencies={data.constituencies} />
    </div>
  );
}