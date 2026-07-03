import { useMemo, useState } from "react";
import {
  Plus, Search, Filter, Download, Pause, Play, MoreHorizontal, Megaphone,
} from "lucide-react";
import { campaigns as initialCampaigns, Platform } from "../lib/data";

type PlatformFilter = "All" | Platform;

export function CampaignManager() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [query, setQuery] = useState("");

  const toggleStatus = (id: number) =>
    setCampaigns(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === "Active" ? "Paused" : "Active" } : c
    ));

  const filtered = useMemo(() => {
    return campaigns.filter(c => {
      const matchesPlatform = platformFilter === "All" || c.platform === platformFilter;
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      return matchesPlatform && matchesQuery;
    });
  }, [campaigns, platformFilter, query]);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const activeCount = campaigns.filter(c => c.status === "Active").length;
  const avgRoas = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Campaign Manager</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {campaigns.length} campaigns · {activeCount} active across Meta &amp; Google
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
            <Plus className="w-3.5 h-3.5" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Campaigns", value: String(campaigns.length), sub: `${activeCount} active · ${campaigns.length - activeCount} paused` },
          { label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, sub: "This billing period" },
          { label: "Avg ROAS", value: `${avgRoas.toFixed(2)}×`, sub: "Across all campaigns" },
          { label: "Total Budget", value: `$${campaigns.reduce((s, c) => s + c.monthlyBudget, 0).toLocaleString()}`, sub: "Monthly allocation" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{s.value}</div>
            <div className="text-xs font-medium text-gray-500 mt-1.5">{s.label}</div>
            <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-0.5">
              {(["All", "Meta", "Google"] as PlatformFilter[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPlatformFilter(p)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    platformFilter === p
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
              <Filter className="w-3 h-3" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Budget</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Spend</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">CTR</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">ROAS</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => {
                const pct = Math.min(100, Math.round((c.spend / c.monthlyBudget) * 100));
                return (
                  <tr key={c.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md flex-shrink-0 ${c.platform === "Meta" ? "bg-indigo-50" : "bg-red-50"}`}>
                          <Megaphone className={`w-3.5 h-3.5 ${c.platform === "Meta" ? "text-indigo-600" : "text-red-600"}`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">{c.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{c.platform} · started {c.startDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                        c.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-gray-900">${c.monthlyBudget.toLocaleString()}</div>
                      <div className="w-20 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : "bg-blue-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-gray-900">${c.spend.toLocaleString()}</span>
                      <div className="text-xs text-gray-400">{pct}% of budget</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{c.ctr.toFixed(1)}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${c.roas >= 2 ? "text-emerald-600" : "text-red-500"}`}>
                        {c.roas.toFixed(1)}×
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleStatus(c.id)}
                          className={`p-1.5 rounded-md transition-colors ${
                            c.status === "Active"
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                          title={c.status === "Active" ? "Pause" : "Resume"}
                        >
                          {c.status === "Active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
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
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-400">
                    No campaigns match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
