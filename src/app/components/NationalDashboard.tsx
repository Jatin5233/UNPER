import { Users, TrendingUp, AlertTriangle, MapPin, FileText } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNationalDashboard, categoryData, DashboardData, StateChartDataItem } from "../../hooks/useDashboardData";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    color: string;
    icon?: React.ReactNode;
  };
}

function MetricCard({ title, value, subtitle, icon, iconBgColor, iconColor, trend }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-semibold">{value}</p>
          {trend ? (
            <p className={`text-xs ${trend.color} mt-1 flex items-center gap-1`}>
              {trend.icon}
              {trend.value}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StateDistributionChartProps {
  data: StateChartDataItem[];
  formatYAxis: (value: number) => string;
}

function StateDistributionChart({ data, formatYAxis }: StateDistributionChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.fullStateName}</p>
          <p className="text-sm text-gray-600">
            Electors: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">State-wise Elector Distribution</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="state" 
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="electors" fill="#003d82" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No state data available
        </div>
      )}
    </div>
  );
}

function CategoryDistributionChart() {
  return (
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
  );
}

interface KeyMetricsProps {
  data: DashboardData;
}

function KeyMetrics({ data }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Registered Electors"
        value={`${data.cards.totalElectors.toFixed(1)}Cr`}
        subtitle="All India"
        icon={<Users className="w-6 h-6" />}
        iconBgColor="bg-blue-100"
        iconColor="text-[#003d82]"
      />

      <MetricCard
        title="Pending Migrations"
        value={data.cards.pendingMigrations}
        subtitle=""
        icon={<FileText className="w-6 h-6" />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        trend={{
          value: "-8% from last month",
          color: "text-green-600",
          icon: <TrendingUp className="w-3 h-3" />
        }}
      />

      <MetricCard
        title="Duplicate Alerts"
        value={data.cards.duplicateAlerts}
        subtitle="Requires attention"
        icon={<AlertTriangle className="w-6 h-6" />}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
      />

      <MetricCard
        title="Active Polling Stations"
        value={data.cards.pollingStations}
        subtitle="Nationwide"
        icon={<MapPin className="w-6 h-6" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
}

export function NationalDashboard() {
  const { data, loading, error, stateChartData, formatYAxisValue } = useNationalDashboard();

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500">Failed to load dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">National Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Comprehensive view of electoral roll across India</p>
      </div>

      {/* Key Metrics */}
      <KeyMetrics data={data} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StateDistributionChart 
          data={stateChartData} 
          formatYAxis={formatYAxisValue} 
        />
        <CategoryDistributionChart />
      </div>
    </div>
  );
}