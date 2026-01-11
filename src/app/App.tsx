import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { LoginScreen } from "./components/LoginScreen";
import { NationalDashboard } from "./components/NationalDashboard";
import { StateDashboard } from "./components/StateDashboard";
import { ElectorSearch } from "./components/ElectorSearch";
import { MigrationWorkflow } from "./components/MigrationWorkflow";
import { BLODataEntry } from "./components/BLODataEntry";
import { PollingStations } from "./components/PollingStations";
import { AuditLog } from "./components/AuditLog";
import { CitizenPortal } from "./components/CitizenPortal";
import { AnomalyAnalysis } from "./components/AnomalyAnalysis";
import { ERODashboard } from "./components/ERODashboard";
import { StatisticalAnalysis } from "./components/StatisticalAnalysis";

interface User {
  name: string;
  role: string;
  state?: string;
  district?: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState("dashboard");

  const handleLogin = (username: string, role: string, additionalInfo?: { state?: string; district?: string }) => {
    setCurrentUser({
      name: username,
      role,
      state: additionalInfo?.state,
      district: additionalInfo?.district,
    });
    
    // Set default view based on role
    if (role === "Citizen") {
      setActiveView("citizen-portal");
    } else if (role === "BLO") {
      setActiveView("blo-entry");
    } else if (role === "RO") {
      setActiveView("ero-dashboard");
    } else {
      setActiveView("dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView("dashboard");
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const renderContent = () => {
    if (!currentUser) {
      return <NationalDashboard />;
    }

    switch (activeView) {
      case "dashboard":
        // Role-based dashboard routing
        if (currentUser.role === "CEC" || currentUser.role === "EC") {
          return <NationalDashboard />;
        } else if (currentUser.role === "CEO" || currentUser.role === "DEO") {
          return <StateDashboard />;
        } else if (currentUser.role === "RO") {
          return <ERODashboard />;
        } else if (currentUser.role === "BLO") {
          return <BLODataEntry />;
        } else if (currentUser.role === "Citizen") {
          return <CitizenPortal />;
        }
        // Default to state dashboard for other roles
        return <StateDashboard />;

      case "elector-search":
        return <ElectorSearch />;

      case "migration":
        return <MigrationWorkflow />;

      case "blo-entry":
        return <BLODataEntry />;

      case "polling-stations":
        return <PollingStations />;

      case "audit-log":
        return <AuditLog />;

      case "citizen-portal":
        return <CitizenPortal />;

      case "anomaly-analysis":
        return <AnomalyAnalysis />;

      case "ero-dashboard":
        return <ERODashboard />;
      case "statistical-analysis":
        return <StatisticalAnalysis userRole={currentUser.role} userState={currentUser.state} />;

      default:
        // Default based on role
        if (currentUser.role === "CEC" || currentUser.role === "EC") {
          return <NationalDashboard />;
        } else if (currentUser.role === "CEO" || currentUser.role === "DEO") {
          return <StateDashboard />;
        } else if (currentUser.role === "RO") {
          return <ERODashboard />;
        }
        return <StateDashboard />;
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          userRole={currentUser.role}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}