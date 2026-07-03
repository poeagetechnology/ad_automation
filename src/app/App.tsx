import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./pages/Dashboard";
import { CampaignManager } from "./pages/CampaignManager";
import { LeadCRM } from "./pages/LeadCRM";
import { AutomationRules } from "./pages/AutomationRules";
import { BudgetPacer } from "./pages/BudgetPacer";
import { AnalyticsReports } from "./pages/AnalyticsReports";
import { autoRules } from "./lib/data";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [autoStates, setAutoStates] = useState<Record<number, boolean>>(
    Object.fromEntries(autoRules.map(r => [r.id, r.active]))
  );
  const [chartPeriod, setChartPeriod] = useState("30D");

  const toggleAuto = (id: number) =>
    setAutoStates(prev => ({ ...prev, [id]: !prev[id] }));

  const renderPage = () => {
    switch (activeNav) {
      case "Campaign Manager":
        return <CampaignManager />;
      case "Lead CRM":
        return <LeadCRM />;
      case "Automation Rules":
        return <AutomationRules autoStates={autoStates} toggleAuto={toggleAuto} />;
      case "Budget Pacer":
        return <BudgetPacer />;
      case "Analytics Reports":
        return <AnalyticsReports />;
      case "Dashboard":
      default:
        return (
          <Dashboard
            autoStates={autoStates}
            toggleAuto={toggleAuto}
            chartPeriod={chartPeriod}
            setChartPeriod={setChartPeriod}
            onNavigate={setActiveNav}
          />
        );
    }
  };

  return (
    <div
      className="flex h-screen bg-[#EEF0F4] overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeNav={activeNav}
        onSelect={setActiveNav}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-hide">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
