import {
  LayoutDashboard, Megaphone, Users, Zap, Gauge, BarChart3,
  Shield, Cpu, Workflow, Clock3, Eye, Wallet,
  PieChart, Image, FlaskConical, Plug, UsersRound, BellRing, CreditCard, Settings,
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

// ─── Audience Insights ────────────────────────────────────────────────────────

export interface AudienceSegment {
  id: number; name: string; platform: Platform; size: number;
  ctr: number; cpc: number; convRate: number; trend: "up" | "down";
}

export const audienceSegments: AudienceSegment[] = [
  { id: 1, name: "Lookalike 1% — Purchasers",         platform: "Meta",   size: 1200000, ctr: 2.9, cpc: 0.81, convRate: 5.2, trend: "up"   },
  { id: 2, name: "Retargeting — Cart Abandoners",     platform: "Meta",   size: 84000,   ctr: 3.6, cpc: 1.12, convRate: 8.9, trend: "up"   },
  { id: 3, name: "In-Market — Business Software",     platform: "Google", size: 410000,  ctr: 2.1, cpc: 1.45, convRate: 4.1, trend: "down" },
  { id: 4, name: "Custom Audience — Newsletter",      platform: "Meta",   size: 32000,   ctr: 4.2, cpc: 0.65, convRate: 9.7, trend: "up"   },
  { id: 5, name: "Similar Audiences — Google",        platform: "Google", size: 960000,  ctr: 1.8, cpc: 1.02, convRate: 3.4, trend: "down" },
];

export const ageGroups = [
  { label: "18–24", pct: 12 },
  { label: "25–34", pct: 34 },
  { label: "35–44", pct: 28 },
  { label: "45–54", pct: 16 },
  { label: "55+",   pct: 10 },
];

export const genderSplit = [
  { label: "Female", pct: 54 },
  { label: "Male",   pct: 44 },
  { label: "Other",  pct: 2  },
];

export const deviceSplit = [
  { label: "Mobile",  pct: 68 },
  { label: "Desktop", pct: 27 },
  { label: "Tablet",  pct: 5  },
];

export const funnelData = [
  { stage: "Impressions", value: 2360000 },
  { stage: "Clicks",      value: 49111   },
  { stage: "Leads",       value: 1847    },
  { stage: "Qualified",   value: 312     },
  { stage: "Customers",   value: 84      },
];

// ─── Creative Studio ────────────────────────────────────────────────────────

export type CreativeType = "Image" | "Video" | "Carousel";

export interface Creative {
  id: number; name: string; campaign: string; platform: Platform; type: CreativeType;
  status: CampaignStatus; impressions: number; ctr: number; cpm: number; fatigue: number;
}

export const creatives: Creative[] = [
  { id: 1, name: "Summer Sale — Hero Banner",        campaign: "Summer Sale — Meta",       platform: "Meta",   type: "Image",    status: "Active", impressions: 186400, ctr: 3.1, cpm: 8.20,  fatigue: 22 },
  { id: 2, name: "Product Demo — 15s Cut",           campaign: "Brand Awareness — Google", platform: "Google", type: "Video",    status: "Active", impressions: 298200, ctr: 1.6, cpm: 11.40, fatigue: 64 },
  { id: 3, name: "Retarget Carousel — Bestsellers",  campaign: "Retargeting — Meta",       platform: "Meta",   type: "Carousel", status: "Paused", impressions: 64200,  ctr: 1.1, cpm: 9.80,  fatigue: 81 },
  { id: 4, name: "Search Ad — Lead Gen Copy A",       campaign: "Lead Gen — Search",        platform: "Google", type: "Image",    status: "Active", impressions: 142300, ctr: 3.4, cpm: 6.90,  fatigue: 18 },
  { id: 5, name: "Lookalike Static — Testimonial",   campaign: "Lookalike Prospecting",    platform: "Meta",   type: "Image",    status: "Active", impressions: 210500, ctr: 2.4, cpm: 7.60,  fatigue: 37 },
  { id: 6, name: "Catalog Video — Q3 Launch",        campaign: "Shopping — Q3 Catalog",    platform: "Google", type: "Video",    status: "Active", impressions: 98700,  ctr: 2.9, cpm: 9.10,  fatigue: 14 },
];

// ─── A/B Testing ────────────────────────────────────────────────────────────

export type ExperimentStatus = "Running" | "Completed" | "Draft";

export interface ExperimentVariant { name: string; visitors: number; conversions: number }

export interface Experiment {
  id: number; name: string; campaign: string; status: ExperimentStatus;
  variantA: ExperimentVariant; variantB: ExperimentVariant; confidence: number; startDate: string;
}

export const experiments: Experiment[] = [
  { id: 1, name: "Headline Test — Summer Sale", campaign: "Summer Sale — Meta",       status: "Running",   variantA: { name: "Control",        visitors: 12400, conversions: 436 }, variantB: { name: "Urgency Copy",   visitors: 12250, conversions: 512 }, confidence: 92, startDate: "Jun 20" },
  { id: 2, name: "CTA Button Color",            campaign: "Lead Gen — Search",        status: "Completed", variantA: { name: "Blue Button",     visitors: 20100, conversions: 804 }, variantB: { name: "Orange Button",  visitors: 20050, conversions: 962 }, confidence: 98, startDate: "Jun 1"  },
  { id: 3, name: "Landing Page Layout",         campaign: "Brand Awareness — Google", status: "Running",   variantA: { name: "Single Column",   visitors: 8300,  conversions: 249 }, variantB: { name: "Two Column",     visitors: 8180,  conversions: 238 }, confidence: 54, startDate: "Jun 28" },
  { id: 4, name: "Video Thumbnail",             campaign: "Shopping — Q3 Catalog",    status: "Draft",     variantA: { name: "Product Shot",    visitors: 0,     conversions: 0   }, variantB: { name: "Lifestyle Shot", visitors: 0,     conversions: 0   }, confidence: 0,  startDate: "—"      },
];

// ─── Integrations ───────────────────────────────────────────────────────────

export type IntegrationStatus = "Connected" | "Not Connected";

export interface Integration {
  id: number; name: string; category: string; status: IntegrationStatus; lastSync: string;
}

export const integrations: Integration[] = [
  { id: 1, name: "Meta Ads",             category: "Advertising",   status: "Connected",     lastSync: "2m ago"  },
  { id: 2, name: "Google Ads",           category: "Advertising",   status: "Connected",     lastSync: "5m ago"  },
  { id: 3, name: "HubSpot CRM",          category: "CRM",           status: "Connected",     lastSync: "14m ago" },
  { id: 4, name: "Slack",                category: "Notifications", status: "Connected",     lastSync: "1h ago"  },
  { id: 5, name: "Zapier",               category: "Automation",    status: "Not Connected", lastSync: "—"       },
  { id: 6, name: "Google Analytics 4",   category: "Analytics",     status: "Connected",     lastSync: "20m ago" },
  { id: 7, name: "Salesforce",           category: "CRM",           status: "Not Connected", lastSync: "—"       },
  { id: 8, name: "Shopify",              category: "Commerce",      status: "Not Connected", lastSync: "—"       },
];

// ─── Team & Roles ────────────────────────────────────────────────────────────

export type TeamRole = "Admin" | "Editor" | "Viewer";
export type TeamStatus = "Active" | "Invited";

export interface TeamMember {
  id: number; name: string; email: string; role: TeamRole; status: TeamStatus; lastActive: string;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Alex Johnson", email: "alex@company.com",   role: "Admin",  status: "Active",  lastActive: "Now"        },
  { id: 2, name: "Priya Shah",   email: "priya@company.com",  role: "Editor", status: "Active",  lastActive: "1h ago"     },
  { id: 3, name: "Marcus Lee",   email: "marcus@company.com", role: "Editor", status: "Active",  lastActive: "3h ago"     },
  { id: 4, name: "Dana Wright",  email: "dana@company.com",   role: "Viewer", status: "Active",  lastActive: "Yesterday" },
  { id: 5, name: "Sam Okoro",    email: "sam@company.com",    role: "Viewer", status: "Invited",  lastActive: "—"         },
];

// ─── Notifications Center ────────────────────────────────────────────────────

export type NotificationType = "budget" | "roas" | "lead" | "system";
export type NotificationSeverity = "info" | "warning" | "critical";

export interface AppNotification {
  id: number; type: NotificationType; message: string; time: string;
  read: boolean; severity: NotificationSeverity;
}

export const initialNotifications: AppNotification[] = [
  { id: 1, type: "roas",   message: "Retargeting — Meta ROAS dropped below 1.5× threshold",                        time: "12m ago",   read: false, severity: "critical" },
  { id: 2, type: "lead",   message: "47 new leads captured today — 12 marked high value",                          time: "1h ago",    read: false, severity: "info"     },
  { id: 3, type: "budget", message: "Competitor Conquest is pacing 15% ahead of its monthly budget",                time: "2h ago",    read: false, severity: "warning"  },
  { id: 4, type: "system", message: "Google Ads sync completed successfully",                                      time: "3h ago",    read: true,  severity: "info"     },
  { id: 5, type: "budget", message: "Video Views — Awareness has spent only 20% of budget with 10 days left",       time: "5h ago",    read: true,  severity: "warning"  },
  { id: 6, type: "system", message: "Weekly performance report generated",                                         time: "Yesterday", read: true,  severity: "info"     },
  { id: 7, type: "lead",   message: "Marcus Webb marked as Qualified — $12,000 potential value",                    time: "Yesterday", read: true,  severity: "info"     },
];

// ─── Billing & Plan ──────────────────────────────────────────────────────────

export const plan = {
  name: "Enterprise", priceMonthly: 499, priceAnnual: 4790,
  seatsUsed: 5, seatsTotal: 10, nextInvoice: "Aug 1, 2025",
};

export const usage = {
  adSpendManaged: 284620, adSpendLimit: 500000,
  apiCalls: 128400, apiCallsLimit: 250000,
};

export const invoices = [
  { id: 1, date: "Jul 1, 2025", amount: "$499.00", status: "Paid" },
  { id: 2, date: "Jun 1, 2025", amount: "$499.00", status: "Paid" },
  { id: 3, date: "May 1, 2025", amount: "$499.00", status: "Paid" },
  { id: 4, date: "Apr 1, 2025", amount: "$449.00", status: "Paid" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navSections = [
  {
    title: "Main Menu",
    items: [
      { icon: LayoutDashboard, label: "Dashboard",         badge: null },
      { icon: Megaphone,       label: "Campaign Manager",  badge: String(campaigns.length) },
      { icon: Users,           label: "Lead CRM",          badge: String(leads.length) },
      { icon: Zap,             label: "Automation Rules",  badge: String(autoRules.length) },
      { icon: Gauge,           label: "Budget Pacer",      badge: null },
      { icon: BarChart3,       label: "Analytics Reports", badge: null },
      { icon: PieChart,        label: "Audience Insights", badge: null },
      { icon: Image,           label: "Creative Studio",   badge: String(creatives.length) },
      { icon: FlaskConical,    label: "A/B Testing",       badge: String(experiments.filter(e => e.status === "Running").length) },
    ],
  },
  {
    title: "Workspace",
    items: [
      { icon: Plug,            label: "Integrations",         badge: String(integrations.filter(i => i.status === "Connected").length) },
      { icon: UsersRound,      label: "Team & Roles",         badge: String(teamMembers.length) },
      { icon: BellRing,        label: "Notifications Center", badge: null },
      { icon: CreditCard,      label: "Billing & Plan",       badge: null },
      { icon: Settings,        label: "Settings",             badge: null },
    ],
  },
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
