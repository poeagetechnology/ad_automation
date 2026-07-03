import { useState } from "react";
import { MousePointerClick, DollarSign, Percent, Eye, Download, FileText } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { performanceData, campaigns } from "../lib/data";
import { MetricCard } from "../components/shared/MetricCard";
import { ChartTooltip } from "../components/shared/ChartTooltip";

const reports = [
  { name: "Weekly Performance Summary", period: "Jun 27 – Jul 3, 2025", size: "1.2 MB" },
  { name: "Monthly Spend Breakdown", period: "June 2025", size: "860 KB" },
  { name: "Lead Quality & Source Report", period: "June 2025", size: "540 KB" },
  { name: "Campaign ROAS Deep Dive", period: "Q2 2025", size: "2.1 MB" },
];

export function AnalyticsReports() {
  const [chartPeriod, setChartPeriod] = useState("30D");

  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const avgCtr = (totalClicks / totalImpressions) * 100;
  const avgCpc = totalSpend / totalClicks;

  const byPlatform = (["Meta", "Google"] as const).map(platform => {
    const rows = campaigns.filter(c => c.platform === platform);
    return {
      platform,
      spend: rows.reduce((s, c) => s + c.spend, 0),
      clicks: rows.reduce((s, c) => s + c.clicks, 0),
      impressions: rows.reduce((s, c) => s + c.impressions, 0),
      roas: rows.reduce((s, c) => s + c.roas, 0) / rows.length,
    };
  });

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Analytics Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">Cross-channel performance for Jun 3 — Jul 3, 2025</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-3.5 h-3.5" />
          Export All
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          label="Avg. CTR"
          value={`${avgCtr.toFixed(2)}%`}
          change="+0.3pt"
          positive={true}
          sub={`${totalClicks.toLocaleString()} total clicks`}
          accentColor="bg-blue-50"
          icon={<MousePointerClick className="w-4 h-4 text-blue-600" />}
        />
        <MetricCard
          label="Avg. CPC"
          value={`$${avgCpc.toFixed(2)}`}
          change="-$0.08"
          positive={true}
          sub="Blended across channels"
          accentColor="bg-emerald-50"
          icon={<DollarSign className="w-4 h-4 text-emerald-600" />}
        />
        <MetricCard
          label="Conversion Rate"
          value="4.8%"
          change="+0.6pt"
          positive={true}
          sub="Lead to qualified"
          accentColor="bg-purple-50"
          icon={<Percent className="w-4 h-4 text-purple-600" />}
        />
        <MetricCard
          label="Impressions"
          value={`${(totalImpressions / 1_000_000).toFixed(2)}M`}
          change="+8.1%"
          positive={true}
          sub="Across all campaigns"
          accentColor="bg-amber-50"
          icon={<Eye className="w-4 h-4 text-amber-600" />}
        />
      </div>

      {/* Performance chart */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Spend Trend</h2>
            <p className="text-xs text-gray-500 mt-0.5">Meta Ads vs Google Ads — Daily Ad Spend (USD)</p>
          </div>
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
        <ResponsiveContainer width="100%" height={210}>
          <LineChart data={performanceData} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={38}
            />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="meta" stroke="#3B82F6" strokeWidth={2.5} dot={false} name="Meta Ads" />
            <Line type="monotone" dataKey="google" stroke="#10B981" strokeWidth={2.5} dot={false} name="Google Ads" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Channel breakdown */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Spend by Channel</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byPlatform} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="platform" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                width={38}
              />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="spend" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Spend" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-50">
            {byPlatform.map(p => (
              <div key={p.platform}>
                <div className="text-xs font-semibold text-gray-900">{p.platform}</div>
                <div className="text-xs text-gray-400">{p.roas.toFixed(1)}× ROAS · {p.clicks.toLocaleString()} clicks</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable reports */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Saved Reports</h2>
            <p className="text-xs text-gray-500 mt-0.5">Generated reports ready for download</p>
          </div>
          <div className="divide-y divide-gray-50">
            {reports.map(r => (
              <div key={r.name} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.period} · {r.size}</div>
                </div>
                <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
