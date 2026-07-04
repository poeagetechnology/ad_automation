import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./pages/Dashboard";
import { CampaignManager } from "./pages/CampaignManager";
import { LeadCRM } from "./pages/LeadCRM";
import { AutomationRules } from "./pages/AutomationRules";
import { BudgetPacer } from "./pages/BudgetPacer";
import { AnalyticsReports } from "./pages/AnalyticsReports";
import { AudienceInsights } from "./pages/AudienceInsights";
import { CreativeStudio } from "./pages/CreativeStudio";
import { ABTesting } from "./pages/ABTesting";
import { Integrations } from "./pages/Integrations";
import { TeamRoles } from "./pages/TeamRoles";
import { NotificationsCenter } from "./pages/NotificationsCenter";
import { BillingPlan } from "./pages/BillingPlan";
import { SettingsPage } from "./pages/SettingsPage";
import { autoRules, initialNotifications, teamMembers as initialTeamMembers, TeamRole } from "./lib/data";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [autoStates, setAutoStates] = useState<Record<number, boolean>>(
    Object.fromEntries(autoRules.map(r => [r.id, r.active]))
  );
  const [chartPeriod, setChartPeriod] = useState("30D");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const toggleAuto = (id: number) =>
    setAutoStates(prev => ({ ...prev, [id]: !prev[id] }));

  const markNotificationRead = (id: number) =>
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  const markAllNotificationsRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const updateTeamMemberRole = (id: number, role: TeamRole) =>
    setTeamMembers(prev => prev.map(m => (m.id === id ? { ...m, role } : m)));

  const inviteTeamMember = (email: string, role: TeamRole) => {
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setTeamMembers(prev => [
      ...prev,
      { id: Math.max(0, ...prev.map(m => m.id)) + 1, name, email, role, status: "Invited", lastActive: "—" },
    ]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
      case "Audience Insights":
        return <AudienceInsights />;
      case "Creative Studio":
        return <CreativeStudio />;
      case "A/B Testing":
        return <ABTesting />;
      case "Integrations":
        return <Integrations />;
      case "Team & Roles":
        return (
          <TeamRoles
            members={teamMembers}
            onUpdateRole={updateTeamMemberRole}
            onInvite={inviteTeamMember}
          />
        );
      case "Notifications Center":
        return (
          <NotificationsCenter
            notifications={notifications}
            onMarkRead={markNotificationRead}
            onMarkAllRead={markAllNotificationsRead}
          />
        );
      case "Billing & Plan":
        return <BillingPlan />;
      case "Settings":
        return <SettingsPage />;
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
        badgeOverrides={{
          "Notifications Center": unreadCount > 0 ? String(unreadCount) : null,
          "Team & Roles": String(teamMembers.length),
        }}
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
