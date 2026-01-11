import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Info,
  ChevronDown,
  Filter,
  Download
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface StatisticalAnalysisProps {
  userRole: string;
  userState?: string;
}

interface ScoreItem {
  rank: number;
  entity: string;
  score: number;
  color: string;
}

export function StatisticalAnalysis({ userRole, userState }: StatisticalAnalysisProps) {
  // Aggregation level: 'national', 'state', or 'constituency'
  // CEO can only view 'state' or 'constituency', CEC can view all three
  const [aggregationLevel, setAggregationLevel] = useState(
    userRole === "CEO" ? "state" : "national"
  );

  const isCEC = userRole === "CEC" || userRole === "EC";
  const isCEO = userRole === "CEO";

  // Mock data for Statistical Health Score
  const healthScoreData: {
    national: ScoreItem[];
    state: { [key: string]: ScoreItem[] };
    constituency: { [key: string]: ScoreItem[] };
  } = {
    national: [
      { rank: 1, entity: "Kerala", score: 94.8, color: "#10b981" },
      { rank: 2, entity: "Tamil Nadu", score: 92.3, color: "#10b981" },
      { rank: 3, entity: "Karnataka", score: 90.1, color: "#10b981" },
      { rank: 4, entity: "Andhra Pradesh", score: 88.7, color: "#10b981" },
      { rank: 5, entity: "Telangana", score: 87.2, color: "#10b981" },
      { rank: 32, entity: "Jharkhand", score: 68.3, color: "#f59e0b" },
      { rank: 33, entity: "Bihar", score: 65.7, color: "#f59e0b" },
      { rank: 34, entity: "Chhattisgarh", score: 64.2, color: "#f59e0b" },
      { rank: 35, entity: "Madhya Pradesh", score: 62.8, color: "#f59e0b" },
      { rank: 36, entity: "Uttar Pradesh", score: 59.4, color: "#f59e0b" }
    ],
    state: {
      Maharashtra: [
        { rank: 1, entity: "Pune", score: 91.5, color: "#10b981" },
        { rank: 2, entity: "Mumbai Suburban", score: 89.2, color: "#10b981" },
        { rank: 3, entity: "Thane", score: 87.8, color: "#10b981" },
        { rank: 4, entity: "Nagpur", score: 86.4, color: "#10b981" },
        { rank: 5, entity: "Nashik", score: 84.9, color: "#10b981" },
        { rank: 32, entity: "Nandurbar", score: 71.2, color: "#f59e0b" },
        { rank: 33, entity: "Gadchiroli", score: 69.8, color: "#f59e0b" },
        { rank: 34, entity: "Washim", score: 68.3, color: "#f59e0b" },
        { rank: 35, entity: "Hingoli", score: 66.7, color: "#f59e0b" },
        { rank: 36, entity: "Osmanabad", score: 64.2, color: "#f59e0b" }
      ]
    },
    constituency: {
      Maharashtra: [
        { rank: 1, entity: "Pune Cantonment", score: 93.7, color: "#10b981" },
        { rank: 2, entity: "Mumbai South", score: 92.1, color: "#10b981" },
        { rank: 3, entity: "Thane West", score: 90.5, color: "#10b981" },
        { rank: 4, entity: "Nagpur Central", score: 89.2, color: "#10b981" },
        { rank: 5, entity: "Nashik East", score: 87.8, color: "#10b981" },
        { rank: 284, entity: "Nandurbar Rural", score: 67.3, color: "#f59e0b" },
        { rank: 285, entity: "Gadchiroli North", score: 65.9, color: "#f59e0b" },
        { rank: 286, entity: "Washim Central", score: 64.4, color: "#f59e0b" },
        { rank: 287, entity: "Hingoli South", score: 62.8, color: "#f59e0b" },
        { rank: 288, entity: "Osmanabad East", score: 60.1, color: "#f59e0b" }
      ]
    }
  };

  // Mock data for Voter Migration Index
  const migrationIndexData: {
    national: ScoreItem[];
    state: { [key: string]: ScoreItem[] };
    constituency: { [key: string]: ScoreItem[] };
  } = {
    national: [
      { rank: 1, entity: "Delhi", score: 87.3, color: "#f59e0b" },
      { rank: 2, entity: "Goa", score: 82.1, color: "#f59e0b" },
      { rank: 3, entity: "Maharashtra", score: 78.6, color: "#f59e0b" },
      { rank: 4, entity: "Karnataka", score: 74.2, color: "#f59e0b" },
      { rank: 5, entity: "Tamil Nadu", score: 71.8, color: "#f59e0b" },
      { rank: 32, entity: "Himachal Pradesh", score: 23.4, color: "#10b981" },
      { rank: 33, entity: "Sikkim", score: 21.7, color: "#10b981" },
      { rank: 34, entity: "Manipur", score: 19.2, color: "#10b981" },
      { rank: 35, entity: "Nagaland", score: 16.8, color: "#10b981" },
      { rank: 36, entity: "Mizoram", score: 14.3, color: "#10b981" }
    ],
    state: {
      Maharashtra: [
        { rank: 1, entity: "Mumbai", score: 92.4, color: "#f59e0b" },
        { rank: 2, entity: "Pune", score: 88.7, color: "#f59e0b" },
        { rank: 3, entity: "Thane", score: 84.3, color: "#f59e0b" },
        { rank: 4, entity: "Nashik", score: 76.9, color: "#f59e0b" },
        { rank: 5, entity: "Nagpur", score: 72.5, color: "#f59e0b" },
        { rank: 32, entity: "Bhandara", score: 28.7, color: "#10b981" },
        { rank: 33, entity: "Washim", score: 26.3, color: "#10b981" },
        { rank: 34, entity: "Hingoli", score: 23.8, color: "#10b981" },
        { rank: 35, entity: "Gadchiroli", score: 20.4, color: "#10b981" },
        { rank: 36, entity: "Nandurbar", score: 17.9, color: "#10b981" }
      ]
    },
    constituency: {
      Maharashtra: [
        { rank: 1, entity: "Mumbai Bandra", score: 94.8, color: "#f59e0b" },
        { rank: 2, entity: "Pune Cantonment", score: 91.2, color: "#f59e0b" },
        { rank: 3, entity: "Thane Creek", score: 87.5, color: "#f59e0b" },
        { rank: 4, entity: "Nashik Road", score: 83.1, color: "#f59e0b" },
        { rank: 5, entity: "Nagpur West", score: 79.6, color: "#f59e0b" },
        { rank: 284, entity: "Bhandara Rural", score: 25.3, color: "#10b981" },
        { rank: 285, entity: "Washim East", score: 22.7, color: "#10b981" },
        { rank: 286, entity: "Hingoli North", score: 19.8, color: "#10b981" },
        { rank: 287, entity: "Gadchiroli South", score: 16.2, color: "#10b981" },
        { rank: 288, entity: "Nandurbar West", score: 13.5, color: "#10b981" }
      ]
    }
  };

  // Mock data for Abuse of Process Score
  const abuseScoreData: {
    national: ScoreItem[];
    state: { [key: string]: ScoreItem[] };
    constituency: { [key: string]: ScoreItem[] };
  } = {
    national: [
      { rank: 1, entity: "Uttar Pradesh", score: 78.4, color: "#f59e0b" },
      { rank: 2, entity: "Bihar", score: 74.9, color: "#f59e0b" },
      { rank: 3, entity: "West Bengal", score: 71.3, color: "#f59e0b" },
      { rank: 4, entity: "Maharashtra", score: 67.8, color: "#f59e0b" },
      { rank: 5, entity: "Rajasthan", score: 64.2, color: "#f59e0b" },
      { rank: 32, entity: "Arunachal Pradesh", score: 18.7, color: "#10b981" },
      { rank: 33, entity: "Mizoram", score: 16.3, color: "#10b981" },
      { rank: 34, entity: "Sikkim", score: 14.8, color: "#10b981" },
      { rank: 35, entity: "Nagaland", score: 12.4, color: "#10b981" },
      { rank: 36, entity: "Goa", score: 9.7, color: "#10b981" }
    ],
    state: {
      Maharashtra: [
        { rank: 1, entity: "Mumbai", score: 82.6, color: "#f59e0b" },
        { rank: 2, entity: "Thane", score: 78.1, color: "#f59e0b" },
        { rank: 3, entity: "Pune", score: 73.5, color: "#f59e0b" },
        { rank: 4, entity: "Nashik", score: 68.9, color: "#f59e0b" },
        { rank: 5, entity: "Nagpur", score: 64.3, color: "#f59e0b" },
        { rank: 32, entity: "Sindhudurg", score: 22.8, color: "#10b981" },
        { rank: 33, entity: "Ratnagiri", score: 20.3, color: "#10b981" },
        { rank: 34, entity: "Gadchiroli", score: 17.9, color: "#10b981" },
        { rank: 35, entity: "Washim", score: 15.2, color: "#10b981" },
        { rank: 36, entity: "Hingoli", score: 12.6, color: "#10b981" }
      ]
    },
    constituency: {
      Maharashtra: [
        { rank: 1, entity: "Mumbai Kurla", score: 85.7, color: "#f59e0b" },
        { rank: 2, entity: "Thane Kalwa", score: 81.3, color: "#f59e0b" },
        { rank: 3, entity: "Pune Hadapsar", score: 76.8, color: "#f59e0b" },
        { rank: 4, entity: "Nashik Central", score: 72.4, color: "#f59e0b" },
        { rank: 5, entity: "Nagpur South", score: 67.9, color: "#f59e0b" },
        { rank: 284, entity: "Sindhudurg Coastal", score: 19.6, color: "#10b981" },
        { rank: 285, entity: "Ratnagiri Rural", score: 17.1, color: "#10b981" },
        { rank: 286, entity: "Gadchiroli East", score: 14.7, color: "#10b981" },
        { rank: 287, entity: "Washim West", score: 11.9, color: "#10b981" },
        { rank: 288, entity: "Hingoli Central", score: 9.2, color: "#10b981" }
      ]
    }
  };

  // Get current data based on role and aggregation level
  const getCurrentHealthScoreData = () => {
    if (isCEC) {
      if (aggregationLevel === "national") return healthScoreData.national;
      if (aggregationLevel === "state") return healthScoreData.state.Maharashtra;
      return healthScoreData.constituency.Maharashtra;
    } else if (isCEO) {
      if (aggregationLevel === "state") return healthScoreData.state[userState || "Maharashtra"];
      return healthScoreData.constituency[userState || "Maharashtra"];
    }
    return [];
  };

  const getCurrentMigrationData = () => {
    if (isCEC) {
      if (aggregationLevel === "national") return migrationIndexData.national;
      if (aggregationLevel === "state") return migrationIndexData.state.Maharashtra;
      return migrationIndexData.constituency.Maharashtra;
    } else if (isCEO) {
      if (aggregationLevel === "state") return migrationIndexData.state[userState || "Maharashtra"];
      return migrationIndexData.constituency[userState || "Maharashtra"];
    }
    return [];
  };

  const getCurrentAbuseScoreData = () => {
    if (isCEC) {
      if (aggregationLevel === "national") return abuseScoreData.national;
      if (aggregationLevel === "state") return abuseScoreData.state.Maharashtra;
      return abuseScoreData.constituency.Maharashtra;
    } else if (isCEO) {
      if (aggregationLevel === "state") return abuseScoreData.state[userState || "Maharashtra"];
      return abuseScoreData.constituency[userState || "Maharashtra"];
    }
    return [];
  };

  const healthData = getCurrentHealthScoreData();
  const migrationData = getCurrentMigrationData();
  const abuseData = getCurrentAbuseScoreData();

  // Split into top 5 and bottom 5
  const topHealthScores = healthData.slice(0, 5);
  const bottomHealthScores = healthData.slice(5, 10);

  const topMigrationScores = migrationData.slice(0, 5);
  const bottomMigrationScores = migrationData.slice(5, 10);

  const topAbuseScores = abuseData.slice(0, 5);
  const bottomAbuseScores = abuseData.slice(5, 10);

  const getAggregationLevelLabel = () => {
    if (aggregationLevel === "national") return "National Level";
    if (aggregationLevel === "state") return "State Level";
    return "Constituency Level";
  };

  const getEntityTypeLabel = () => {
    if (aggregationLevel === "national") return "States";
    if (aggregationLevel === "state") return "Districts";
    return "Constituencies";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-[#003d82]" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Statistical Analysis & Integrity Metrics
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          High-level statistical indicators for electoral roll health and administrative oversight
        </p>
      </div>

      {/* Role-based context indicator and aggregation controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#003d82]" />
            <div>
              {isCEO && (
                <>
                  <p className="text-sm font-medium text-gray-900">
                    Viewing data for: {userState || "Maharashtra"}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    State-level and constituency-level data only
                  </p>
                </>
              )}
              {isCEC && (
                <>
                  <p className="text-sm font-medium text-gray-900">
                    Aggregation Level: {getAggregationLevelLabel()}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    National oversight enabled
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Aggregation level selector - only for CEC */}
          {isCEC && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAggregationLevel("national")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  aggregationLevel === "national"
                    ? "bg-[#003d82] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                National
              </button>
              <button
                onClick={() => setAggregationLevel("state")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  aggregationLevel === "state"
                    ? "bg-[#003d82] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                State
              </button>
              <button
                onClick={() => setAggregationLevel("constituency")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  aggregationLevel === "constituency"
                    ? "bg-[#003d82] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Constituency
              </button>
            </div>
          )}

          {/* Aggregation level selector - only for CEO (state vs constituency) */}
          {isCEO && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAggregationLevel("state")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  aggregationLevel === "state"
                    ? "bg-[#003d82] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                State View
              </button>
              <button
                onClick={() => setAggregationLevel("constituency")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  aggregationLevel === "constituency"
                    ? "bg-[#003d82] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Constituency View
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 1. Statistical Health Score */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#003d82]" />
                Statistical Health Score
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Composite indicator of demographic and participation balance
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-3 h-3" />
              Export
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 5 */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Top 5 {getEntityTypeLabel()} - Highest Health Scores
              </h4>
              <div className="space-y-3">
                {topHealthScores.map((item: ScoreItem, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 5 */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Bottom 5 {getEntityTypeLabel()} - Requires Attention
              </h4>
              <div className="space-y-3">
                {bottomHealthScores.map((item: ScoreItem, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-orange-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-900">About this metric</p>
              <p className="text-xs text-blue-700 mt-1">
                This score represents a weighted composite indicator derived from demographic balance, 
                age distribution, and participation patterns. Higher scores indicate better statistical alignment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Voter Migration Index */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#003d82]" />
                Voter Migration Index
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Index highlighting voter roll churn and migration pressure
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-3 h-3" />
              Export
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 5 - Highest Migration */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Top 5 {getEntityTypeLabel()} - Highest Migration Activity
              </h4>
              <div className="space-y-3">
                {topMigrationScores.map((item: ScoreItem, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-orange-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 5 - Lowest Migration */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Bottom 5 {getEntityTypeLabel()} - Lowest Migration Activity
              </h4>
              <div className="space-y-3">
                {bottomMigrationScores.map((item: ScoreItem, idx: number) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-900">About this metric</p>
              <p className="text-xs text-blue-700 mt-1">
                Higher values indicate elevated migration or churn activity. This index is derived from 
                migration intensity, Form-6 application volume, and voter roll update patterns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Abuse of Process Score */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#003d82]" />
                Administrative Stress Indicator
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Composite indicator of administrative workload and process pressure
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-3 h-3" />
              Export
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Important Disclaimer */}
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-yellow-900">Important Notice</p>
              <p className="text-xs text-yellow-800 mt-1">
                This indicator reflects administrative workload patterns and does not imply misconduct. 
                It is intended for resource allocation and capacity planning purposes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 5 - Highest Stress */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Top 5 {getEntityTypeLabel()} - Highest Administrative Load
              </h4>
              <div className="space-y-3">
                {topAbuseScores.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-orange-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 5 - Lowest Stress */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Bottom 5 {getEntityTypeLabel()} - Lowest Administrative Load
              </h4>
              <div className="space-y-3">
                {bottomAbuseScores.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500 w-6">#{item.rank}</span>
                        <span className="text-sm font-medium text-gray-900">{item.entity}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-700">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-900">About this metric</p>
              <p className="text-xs text-blue-700 mt-1">
                This composite indicator is derived from rejection patterns, objection volume, 
                freeze-period application load, and administrative processing capacity. Higher scores 
                suggest areas that may benefit from additional administrative resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}