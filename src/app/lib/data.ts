import {
  LayoutDashboard, Megaphone, Users, Zap, Gauge, BarChart3,
  Shield, Cpu, Workflow, Clock3, Eye, Wallet,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeadStatus = "New" | "Contacted" | "Qualified";
export type AutoType = "protection" | "optimization" | "workflow" | "scheduling" | "monitoring" | "budget";
export type Platform = "Meta" | "Google";
export type CampaignStatus = "Active" | "Paused";

export interface Lead {
  id: number; name: string; email: string; source: Platform;
  status: LeadStatus; time: string; value: string;
}

export interface AutoRule {
  id: number; name: string; desc: string; active: boolean;
  triggered: string; platform: "Meta" | "Google" | "Both" | "CRM"; type: AutoType;
}

export interface Campaign {
  id: number; name: string; platform: Platform; status: CampaignStatus;
  monthlyBudget: number; spend: number; roas: number; ctr: number;
  cpc: number; clicks: number; impressions: number; startDate: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

export const performanceData = [
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

export const leads: Lead[] = [
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

export const autoRules: AutoRule[] = [
  { id: 1, name: "Auto-Pause Low ROAS",      desc: "Pauses ads when ROAS < 1.5x for 2+ hours",         active: true,  triggered: "1h ago",     platform: "Meta",   type: "protection"   },
  { id: 2, name: "Budget Reallocation",      desc: "Shifts budget to top performer at midnight",        active: true,  triggered: "8h ago",     platform: "Both",   type: "optimization" },
  { id: 3, name: "Lead Auto-Assign",         desc: "Routes new leads to available sales rep",           active: true,  triggered: "2m ago",     platform: "CRM",    type: "workflow"     },
  { id: 4, name: "Bid Boost — Peak Hours",   desc: "Increases bids 20% from 6PM–9PM on weekdays",      active: false, triggered: "Yesterday",  platform: "Google", type: "scheduling"   },
  { id: 5, name: "Frequency Cap Alert",      desc: "Notifies when ad frequency exceeds 3.5×",          active: true,  triggered: "3h ago",     platform: "Meta",   type: "monitoring"   },
  { id: 6, name: "Spend Pacing Alert",       desc: "Alerts if daily spend is behind target by 15%+",   active: false, triggered: "2 days ago", platform: "Both",   type: "budget"       },
];

export const campaigns: Campaign[] = [
  { id: 1, name: "Summer Sale — Meta",          platform: "Meta",   status: "Active", monthlyBudget: 15000, spend: 12440, roas: 4.2, ctr: 2.8, cpc: 1.12, clicks: 11107, impressions: 396680, startDate: "Jun 1" },
  { id: 2, name: "Brand Awareness — Google",    platform: "Google", status: "Active", monthlyBudget: 10000, spend: 8910,  roas: 3.1, ctr: 1.9, cpc: 0.94, clicks: 9479,  impressions: 498894, startDate: "Jun 1" },
  { id: 3, name: "Retargeting — Meta",          platform: "Meta",   status: "Paused", monthlyBudget: 6000,  spend: 2100,  roas: 1.4, ctr: 1.2, cpc: 1.65, clicks: 1273,  impressions: 106083, startDate: "Jun 10" },
  { id: 4, name: "Lead Gen — Search",           platform: "Google", status: "Active", monthlyBudget: 12000, spend: 9870,  roas: 3.8, ctr: 3.4, cpc: 1.38, clicks: 7152,  impressions: 210352, startDate: "Jun 1" },
  { id: 5, name: "Lookalike Prospecting",       platform: "Meta",   status: "Active", monthlyBudget: 8000,  spend: 7320,  roas: 2.6, ctr: 2.1, cpc: 0.87, clicks: 8414,  impressions: 400666, startDate: "Jun 5" },
  { id: 6, name: "Shopping — Q3 Catalog",       platform: "Google", status: "Active", monthlyBudget: 9000,  spend: 4210,  roas: 4.9, ctr: 2.5, cpc: 0.71, clicks: 5930,  impressions: 237200, startDate: "Jun 15" },
  { id: 7, name: "Video Views — Awareness",     platform: "Meta",   status: "Paused", monthlyBudget: 5000,  spend: 980,   roas: 0.9, ctr: 0.8, cpc: 0.42, clicks: 2333,  impressions: 291625, startDate: "Jun 20" },
  { id: 8, name: "Competitor Conquest",         platform: "Google", status: "Active", monthlyBudget: 7000,  spend: 6900,  roas: 2.2, ctr: 1.6, cpc: 1.94, clicks: 3423,  impressions: 213938, startDate: "Jun 8" },
];

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",         badge: null },
  { icon: Megaphone,       label: "Campaign Manager",  badge: String(campaigns.length) },
  { icon: Users,           label: "Lead CRM",          badge: String(leads.length) },
  { icon: Zap,             label: "Automation Rules",  badge: String(autoRules.length) },
  { icon: Gauge,           label: "Budget Pacer",      badge: null },
  { icon: BarChart3,       label: "Analytics Reports", badge: null },
];

// ─── Config Maps ──────────────────────────────────────────────────────────────

export const statusCfg: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  New:       { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500"    },
  Contacted: { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
  Qualified: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
};

export const sourceCfg: Record<string, { bg: string; text: string }> = {
  Meta:   { bg: "bg-indigo-50", text: "text-indigo-700" },
  Google: { bg: "bg-red-50",    text: "text-red-700"    },
};

export const typeCfg: Record<AutoType, { bg: string; text: string; label: string; Icon: React.ElementType }> = {
  protection:   { bg: "bg-red-50",     text: "text-red-600",     label: "Protection",   Icon: Shield   },
  optimization: { bg: "bg-blue-50",    text: "text-blue-600",    label: "Optimization", Icon: Cpu      },
  workflow:     { bg: "bg-purple-50",  text: "text-purple-600",  label: "Workflow",     Icon: Workflow  },
  scheduling:   { bg: "bg-amber-50",   text: "text-amber-600",   label: "Scheduling",   Icon: Clock3   },
  monitoring:   { bg: "bg-orange-50",  text: "text-orange-600",  label: "Monitoring",   Icon: Eye      },
  budget:       { bg: "bg-emerald-50", text: "text-emerald-600", label: "Budget",       Icon: Wallet   },
};
