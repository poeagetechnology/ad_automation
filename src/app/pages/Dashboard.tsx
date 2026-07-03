import {
  DollarSign, TrendingUp, Users, Target, Download, RefreshCw, Filter,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { performanceData, leads, autoRules, campaigns } from "../lib/data";
import { MetricCard } from "../components/shared/MetricCard";
import { LeadRow } from "../components/shared/LeadRow";
import { AutoCard } from "../components/shared/AutoCard";
import { ChartTooltip } from "../components/shared/ChartTooltip";

interface DashboardProps {
  autoStates: Record<number, boolean>;
  toggleAuto: (id: number) => void;
  chartPeriod: string;
  setChartPeriod: (period: string) => void;
  onNavigate: (label: string) => void;
}

export function Dashboard({ autoStates, toggleAuto, chartPeriod, setChartPeriod, onNavigate }: DashboardProps) {
  const activeCount = Object.values(autoStates).filter(Boolean).length;
  const topCampaigns = campaigns.slice(0, 3);

  return (
    <>
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
              <button
                onClick={() => onNavigate("Lead CRM")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
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
              <button
                onClick={() => onNavigate("Campaign Manager")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                All campaigns →
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {topCampaigns.map(c => (
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
                      <span className="text-xs text-gray-400">${c.spend.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${c.roas >= 2 ? "text-emerald-600" : "text-red-500"}`}>
                      {c.roas.toFixed(1)}×
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
              <button
                onClick={() => onNavigate("Automation Rules")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
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
    </>
  );
}
