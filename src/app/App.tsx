import { useState } from "react";
import {
  LayoutDashboard, Megaphone, Users, Zap, Gauge, BarChart3,
  Search, Bell, ChevronDown, ChevronLeft, Mail, MessageSquare,
  Settings, Calendar, ArrowUpRight, ArrowDownRight, RefreshCw,
  Filter, Download, Activity, MoreHorizontal, DollarSign,
  Target, TrendingUp, Shield, Cpu, Workflow, Clock3, Eye, Wallet,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ─── Static Data ──────────────────────────────────────────────────────────────

const performanceData = [
  { date: "Jun 3",  meta: 3200, google: 2800 },
  { date: "Jun 6",  meta: 3900, google: 3100 },
  { date: "Jun 9",  meta: 3500, google: 3400 },
  { date: "Jun 12", meta: 4600, google: 3200 },
  { date: "Jun 15", meta: 5100, google: 4100 },
  { date: "Jun 18", meta: 4700, google: 4400 },
  { date: "Jun 21", meta: 5800, google: 4600 },
  { date: "Jun 24", meta: 5200, google: 4900 },
  { date: "Jun 27", meta: 6400, google: 5700 },
  { date: "Jun 30", meta: 6900, google: 5400 },
  { date: "Jul 3",  meta: 7200, google: 6200 },
];

type LeadStatus = "New" | "Contacted" | "Qualified";
type AutoType = "protection" | "optimization" | "workflow" | "scheduling" | "monitoring" | "budget";

interface Lead {
  id: number; name: string; email: string; source: string;
  status: LeadStatus; time: string; value: string;
}

interface AutoRule {
  id: number; name: string; desc: string; active: boolean;
  triggered: string; platform: string; type: AutoType;
}

const leads: Lead[] = [
  { id: 1,  name: "James Thornton",  email: "j.thornton@email.com",  source: "Meta",   status: "New",       time: "2m ago",  value: "$8,400"  },
  { id: 2,  name: "Priya Mehta",     email: "priya.m@gmail.com",     source: "Google", status: "Contacted", time: "14m ago", value: "$3,200"  },
  { id: 3,  name: "Marcus Webb",     email: "marcus.w@corp.com",     source: "Meta",   status: "Qualified", time: "31m ago", value: "$12,000" },
  { id: 4,  name: "Sofia Laurent",   email: "sofial@outlook.com",    source: "Google", status: "New",       time: "52m ago", value: "$5,600"  },
  { id: 5,  name: "David Okafor",    email: "d.okafor@biz.io",       source: "Meta",   status: "Contacted", time: "1h ago",  value: "$9,100"  },
  { id: 6,  name: "Emily Chen",      email: "echen@startup.co",      source: "Google", status: "Qualified", time: "2h ago",  value: "$15,800" },
  { id: 7,  name: "Ravi Krishnan",   email: "ravi.k@domain.net",     source: "Meta",   status: "New",       time: "3h ago",  value: "$4,700"  },
  { id: 8,  name: "Hannah Fischer",  email: "h.fischer@mail.de",     source: "Google", status: "Contacted", time: "4h ago",  value: "$6,300"  },
  { id: 9,  name: "Carlos Mendez",   email: "cmendez@company.mx",    source: "Meta",   status: "New",       time: "5h ago",  value: "$2,900"  },
  { id: 10, name: "Aisha Williams",  email: "a.williams@pro.com",    source: "Google", status: "Qualified", time: "6h ago",  value: "$11,200" },
];

const autoRules: AutoRule[] = [
  { id: 1, name: "Auto-Pause Low ROAS",      desc: "Pauses ads when ROAS < 1.5x for 2+ hours",         active: true,  triggered: "1h ago",     platform: "Meta",   type: "protection"   },
  { id: 2, name: "Budget Reallocation",      desc: "Shifts budget to top performer at midnight",        active: true,  triggered: "8h ago",     platform: "Both",   type: "optimization" },
  { id: 3, name: "Lead Auto-Assign",         desc: "Routes new leads to available sales rep",           active: true,  triggered: "2m ago",     platform: "CRM",    type: "workflow"     },
  { id: 4, name: "Bid Boost — Peak Hours",   desc: "Increases bids 20% from 6PM–9PM on weekdays",      active: false, triggered: "Yesterday",  platform: "Google", type: "scheduling"   },
  { id: 5, name: "Frequency Cap Alert",      desc: "Notifies when ad frequency exceeds 3.5×",          active: true,  triggered: "3h ago",     platform: "Meta",   type: "monitoring"   },
  { id: 6, name: "Spend Pacing Alert",       desc: "Alerts if daily spend is behind target by 15%+",   active: false, triggered: "2 days ago", platform: "Both",   type: "budget"       },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",         badge: null },
  { icon: Megaphone,       label: "Campaign Manager",  badge: "12" },
  { icon: Users,           label: "Lead CRM",          badge: "47" },
  { icon: Zap,             label: "Automation Rules",  badge: "6"  },
  { icon: Gauge,           label: "Budget Pacer",      badge: null },
  { icon: BarChart3,       label: "Analytics Reports", badge: null },
];

// ─── Config Maps ──────────────────────────────────────────────────────────────

const statusCfg: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  New:       { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500"    },
  Contacted: { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
  Qualified: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
};

const sourceCfg: Record<string, { bg: string; text: string }> = {
  Meta:   { bg: "bg-indigo-50", text: "text-indigo-700" },
  Google: { bg: "bg-red-50",    text: "text-red-700"    },
};

const typeCfg: Record<AutoType, { bg: string; text: string; label: string; Icon: React.ElementType }> = {
  protection:   { bg: "bg-red-50",     text: "text-red-600",     label: "Protection",   Icon: Shield   },
  optimization: { bg: "bg-blue-50",    text: "text-blue-600",    label: "Optimization", Icon: Cpu      },
  workflow:     { bg: "bg-purple-50",  text: "text-purple-600",  label: "Workflow",     Icon: Workflow  },
  scheduling:   { bg: "bg-amber-50",   text: "text-amber-600",   label: "Scheduling",   Icon: Clock3   },
  monitoring:   { bg: "bg-orange-50",  text: "text-orange-600",  label: "Monitoring",   Icon: Eye      },
  budget:       { bg: "bg-emerald-50", text: "text-emerald-600", label: "Budget",       Icon: Wallet   },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400/40 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

interface MetricCardProps {
  label: string; value: string; change: string; positive: boolean; sub: string;
  icon: React.ReactNode; accentColor: string;
}

function MetricCard({ label, value, change, positive, sub, icon, accentColor }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${accentColor}`}>{icon}</div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
            positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{value}</div>
        <div className="text-xs font-medium text-gray-500 mt-1.5">{label}</div>
      </div>
      <div className="text-xs text-gray-400 border-t border-gray-50 pt-2.5">{sub}</div>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const sc = statusCfg[lead.status];
  const src = sourceCfg[lead.source] ?? { bg: "bg-gray-100", text: "text-gray-600" };
  const initials = lead.name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <tr className="hover:bg-gray-50/70 transition-colors group">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 leading-tight">{lead.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{lead.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${src.bg} ${src.text}`}>
          {lead.source}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {lead.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm font-bold text-gray-900">{lead.value}</span>
        <div className="text-xs text-gray-400">{lead.time}</div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            title="More"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function AutoCard({ rule, active, onToggle }: { rule: AutoRule; active: boolean; onToggle: () => void }) {
  const tc = typeCfg[rule.type];
  const { Icon: TypeIcon } = tc;
  return (
    <div className={`p-3.5 rounded-xl border transition-all duration-150 ${
      active ? "border-gray-100 bg-white shadow-sm" : "border-gray-100 bg-gray-50/80"
    }`}>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <div className={`p-1.5 rounded-md mt-0.5 flex-shrink-0 ${tc.bg}`}>
            <TypeIcon className={`w-3 h-3 ${tc.text}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-semibold leading-tight ${active ? "text-gray-900" : "text-gray-400"}`}>
              {rule.name}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{rule.desc}</p>
          </div>
        </div>
        <Toggle checked={active} onChange={onToggle} />
      </div>
      <div className="flex items-center justify-between pl-8">
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${tc.bg} ${tc.text}`}>
          {tc.label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">
            {rule.platform}
          </span>
          <span className="text-xs text-gray-400">{rule.triggered}</span>
        </div>
      </div>
    </div>
  );
}

interface TooltipItem { name: string; value: number; color: string }

function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: TooltipItem[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D1117] rounded-xl px-3.5 py-3 shadow-2xl border border-white/10">
      <div className="text-xs text-gray-400 mb-2 font-medium">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-gray-300">{p.name}</span>
          <span className="text-white font-bold ml-auto pl-3">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Campaign Status Mini-cards ───────────────────────────────────────────────

const campaigns = [
  { name: "Summer Sale — Meta", status: "Active",  spend: "$12,440", roas: "4.2×", trend: true  },
  { name: "Brand Awareness — Google", status: "Active", spend: "$8,910", roas: "3.1×", trend: true  },
  { name: "Retargeting — Meta",  status: "Paused", spend: "$2,100", roas: "1.4×", trend: false },
];

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [autoStates, setAutoStates] = useState<Record<number, boolean>>(
    Object.fromEntries(autoRules.map(r => [r.id, r.active]))
  );
  const [chartPeriod, setChartPeriod] = useState("30D");

  const toggleAuto = (id: number) =>
    setAutoStates(prev => ({ ...prev, [id]: !prev[id] }));

  const activeCount = Object.values(autoStates).filter(Boolean).length;

  return (
    <div
      className="flex h-screen bg-[#EEF0F4] overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`${sidebarCollapsed ? "w-[68px]" : "w-[232px]"} bg-[#0D1117] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/10 flex-shrink-0">
          {sidebarCollapsed ? (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
              <Activity className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-tight">MarketOS</div>
                <div className="text-gray-600 text-[10px] font-medium uppercase tracking-widest">Enterprise</div>
              </div>
            </div>
          )}
        </div>

        {/* Section label */}
        {!sidebarCollapsed && (
          <div className="px-4 pt-5 pb-1.5">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em]">Main Menu</span>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-hidden">
          {navItems.map(({ icon: Icon, label, badge }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                title={sidebarCollapsed ? label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{label}</span>
                    {badge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive ? "bg-white/25 text-white" : "bg-white/10 text-gray-400"
                      }`}>
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-2 space-y-0.5">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                AJ
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-gray-100 truncate">Alex Johnson</div>
                <div className="text-[11px] text-gray-500 truncate">alex@company.com</div>
              </div>
              <Settings className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-colors text-sm ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`}
            />
            {!sidebarCollapsed && <span className="text-xs font-medium">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200/80 flex items-center px-5 gap-3 flex-shrink-0 z-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns, leads, reports..."
              className="w-full pl-9 pr-10 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center text-[10px] text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 font-mono">
              ⌘K
            </kbd>
          </div>

          {/* Date range */}
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>Jun 3 — Jul 3, 2025</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {/* Connection badges */}
          <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-blue-700">Meta</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">Google</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <span className="text-xs font-semibold text-amber-700">HubSpot</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1.5" />
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                AJ
              </div>
              <div className="hidden md:block leading-tight">
                <div className="text-xs font-semibold text-gray-900">Alex Johnson</div>
                <div className="text-[11px] text-gray-400">Admin</div>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-hide">
          {/* Page heading */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-base font-bold text-gray-900">Overview Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  All systems synced
                </span>
                <span className="text-gray-300">·</span>
                Last updated 3 min ago
                <span className="text-gray-300">·</span>
                Jul 3, 2025
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
                <RefreshCw className="w-3.5 h-3.5" />
                Sync Now
              </button>
            </div>
          </div>

          {/* ── Metric cards ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard
              label="Total Spend"
              value="$284,620"
              change="+12.4%"
              positive={true}
              sub="vs $253,260 last period"
              accentColor="bg-blue-50"
              icon={<DollarSign className="w-4 h-4 text-blue-600" />}
            />
            <MetricCard
              label="Blended ROAS"
              value="3.72×"
              change="+0.24"
              positive={true}
              sub="Meta 4.1× · Google 3.2×"
              accentColor="bg-emerald-50"
              icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
            />
            <MetricCard
              label="Active Leads"
              value="1,847"
              change="+231"
              positive={true}
              sub="47 new today · 312 qualified"
              accentColor="bg-purple-50"
              icon={<Users className="w-4 h-4 text-purple-600" />}
            />
            <MetricCard
              label="Cost Per Acquisition"
              value="$68.40"
              change="-$4.20"
              positive={true}
              sub="Target $75.00 · On track"
              accentColor="bg-amber-50"
              icon={<Target className="w-4 h-4 text-amber-600" />}
            />
          </div>

          {/* ── Performance chart ── */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Performance Comparison</h2>
                <p className="text-xs text-gray-500 mt-0.5">Meta Ads vs Google Ads — Daily Ad Spend (USD)</p>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {/* Legend */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-0.5 bg-blue-500 rounded-full inline-block" />
                    <span className="text-xs font-medium text-gray-500">Meta Ads</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-0.5 bg-emerald-500 rounded-full inline-block" />
                    <span className="text-xs font-medium text-gray-500">Google Ads</span>
                  </div>
                </div>
                {/* Period selector */}
                <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                  {["7D", "30D", "90D"].map(p => (
                    <button
                      key={p}
                      onClick={() => setChartPeriod(p)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                        chartPeriod === p
                          ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Summary row */}
            <div className="flex items-center gap-6 mb-5 pb-4 border-b border-gray-50">
              {[
                { label: "Meta Total Spend", value: "$168,400", color: "text-blue-600" },
                { label: "Google Total Spend", value: "$116,220", color: "text-emerald-600" },
                { label: "Meta Avg Daily", value: "$5,613", color: "text-gray-600" },
                { label: "Google Avg Daily", value: "$3,874", color: "text-gray-600" },
              ].map(s => (
                <div key={s.label}>
                  <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={performanceData} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                  width={38}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={false}
                  name="Meta Ads"
                  activeDot={{ r: 4, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="google"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={false}
                  name="Google Ads"
                  activeDot={{ r: 4, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ── Bottom row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

            {/* Lead Activity Feed */}
            <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Lead Activity Feed</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="text-emerald-600 font-semibold">47</span> new enquiries today ·{" "}
                    <span className="text-blue-600 font-semibold">312</span> qualified
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    View all →
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lead</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Source</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Value</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.map(lead => <LeadRow key={lead.id} lead={lead} />)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column */}
            <div className="xl:col-span-2 flex flex-col gap-4">

              {/* Campaign snapshot */}
              <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-900">Top Campaigns</h2>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    All campaigns →
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {campaigns.map(c => (
                    <div key={c.name} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-900 truncate">{c.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            c.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {c.status}
                          </span>
                          <span className="text-xs text-gray-400">{c.spend}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${c.trend ? "text-emerald-600" : "text-red-500"}`}>
                          {c.roas}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">ROAS</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Automations */}
              <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">Active Automations</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <span className="text-blue-600 font-semibold">{activeCount}</span> of {autoRules.length} rules running
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Manage →
                  </button>
                </div>
                <div className="overflow-y-auto p-3 space-y-2 max-h-[340px] scrollbar-hide">
                  {autoRules.map(rule => (
                    <AutoCard
                      key={rule.id}
                      rule={rule}
                      active={autoStates[rule.id]}
                      onToggle={() => toggleAuto(rule.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom padding */}
          <div className="h-4" />
        </main>
      </div>
    </div>
  );
}
