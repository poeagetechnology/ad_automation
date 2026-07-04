import { TrendingUp, TrendingDown, Users, Smartphone, Monitor, Tablet } from "lucide-react";
import { audienceSegments, ageGroups, genderSplit, deviceSplit, funnelData } from "../lib/data";

const deviceIcon = { Mobile: Smartphone, Desktop: Monitor, Tablet: Tablet } as const;

export function AudienceInsights() {
  const totalReach = audienceSegments.reduce((s, a) => s + a.size, 0);
  const avgConv = audienceSegments.reduce((s, a) => s + a.convRate, 0) / audienceSegments.length;
  const maxFunnel = funnelData[0].value;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Audience Insights</h1>
          <p className="text-xs text-gray-500 mt-0.5">{audienceSegments.length} segments · {(totalReach / 1_000_000).toFixed(1)}M total reach</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{(totalReach / 1_000_000).toFixed(2)}M</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Total Reach</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Across {audienceSegments.length} segments</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{avgConv.toFixed(1)}%</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Avg. Conversion Rate</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Weighted across segments</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{funnelData[funnelData.length - 1].value}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Customers Won</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">{((funnelData[funnelData.length - 1].value / funnelData[2].value) * 100).toFixed(1)}% of leads</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">68%</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Mobile Share</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Of all impressions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Segments table */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Top Segments</h2>
            <p className="text-xs text-gray-500 mt-0.5">Ranked by conversion rate</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Segment</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Size</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">CTR</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">CPC</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...audienceSegments].sort((a, b) => b.convRate - a.convRate).map(seg => (
                  <tr key={seg.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-md flex-shrink-0 ${seg.platform === "Meta" ? "bg-indigo-50" : "bg-red-50"}`}>
                          <Users className={`w-3.5 h-3.5 ${seg.platform === "Meta" ? "text-indigo-600" : "text-red-600"}`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">{seg.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{seg.platform}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{seg.size >= 1_000_000 ? `${(seg.size / 1_000_000).toFixed(1)}M` : `${(seg.size / 1000).toFixed(0)}K`}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{seg.ctr.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${seg.cpc.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-sm font-bold ${seg.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                        {seg.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {seg.convRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demographics */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Age Distribution</h2>
            <div className="space-y-2">
              {ageGroups.map(g => (
                <div key={g.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-10 flex-shrink-0">{g.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${g.pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right flex-shrink-0">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Gender Split</h2>
            <div className="flex items-center gap-1.5 h-2.5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: `${genderSplit[0].pct}%` }} />
              <div className="h-full bg-blue-400" style={{ width: `${genderSplit[1].pct}%` }} />
              <div className="h-full bg-gray-300" style={{ width: `${genderSplit[2].pct}%` }} />
            </div>
            <div className="flex items-center gap-4 mt-3">
              {genderSplit.map((g, i) => (
                <div key={g.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={`w-2 h-2 rounded-full ${["bg-purple-500", "bg-blue-400", "bg-gray-300"][i]}`} />
                  {g.label} {g.pct}%
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm flex-1">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Device Breakdown</h2>
            <div className="space-y-3">
              {deviceSplit.map(d => {
                const DIcon = deviceIcon[d.label as keyof typeof deviceIcon];
                return (
                  <div key={d.label} className="flex items-center gap-3">
                    <DIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500 w-16 flex-shrink-0">{d.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 w-8 text-right flex-shrink-0">{d.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Conversion Funnel</h2>
        <div className="space-y-2.5">
          {funnelData.map((f, i) => {
            const pct = (f.value / maxFunnel) * 100;
            const prevPct = i > 0 ? (funnelData[i - 1].value / f.value) : null;
            return (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">{f.stage}</span>
                <div className="flex-1 h-7 bg-gray-50 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-end px-3"
                    style={{ width: `${Math.max(pct, 4)}%` }}
                  >
                    <span className="text-xs font-semibold text-white whitespace-nowrap">{f.value.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-20 text-right flex-shrink-0">
                  {prevPct ? `${(100 / prevPct).toFixed(1)}%` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
