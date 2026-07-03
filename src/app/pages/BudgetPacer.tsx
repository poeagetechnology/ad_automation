import { AlertTriangle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { campaigns } from "../lib/data";

const TODAY = new Date("2025-07-03");
const CYCLE_DAYS = 30;

function daysElapsed(startDate: string) {
  const start = new Date(`${startDate}, 2025`);
  const diff = Math.round((TODAY.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

function paceStatus(spend: number, budget: number, elapsed: number) {
  const expectedPct = Math.min(100, (elapsed / CYCLE_DAYS) * 100);
  const actualPct = (spend / budget) * 100;
  const diff = actualPct - expectedPct;
  if (diff > 12) return { label: "Overpacing", tone: "red" as const, diff };
  if (diff < -12) return { label: "Underpacing", tone: "amber" as const, diff };
  return { label: "On Track", tone: "emerald" as const, diff };
}

const toneCfg = {
  red:     { bg: "bg-red-50",     text: "text-red-600",     bar: "bg-red-500"     },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   bar: "bg-amber-400"   },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500" },
};

export function BudgetPacer() {
  const rows = campaigns.map(c => {
    const elapsed = daysElapsed(c.startDate);
    const status = paceStatus(c.spend, c.monthlyBudget, elapsed);
    const dailyTarget = c.monthlyBudget / CYCLE_DAYS;
    const remaining = Math.max(0, c.monthlyBudget - c.spend);
    return { ...c, elapsed, status, dailyTarget, remaining };
  });

  const overpacing = rows.filter(r => r.status.tone === "red");
  const underpacing = rows.filter(r => r.status.tone === "amber");
  const totalBudget = campaigns.reduce((s, c) => s + c.monthlyBudget, 0);
  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Budget Pacer</h1>
          <p className="text-xs text-gray-500 mt-0.5">Spend pacing vs. 30-day budget cycle · as of Jul 3, 2025</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">${totalSpend.toLocaleString()}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Total Spend</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">of ${totalBudget.toLocaleString()} budgeted</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{Math.round((totalSpend / totalBudget) * 100)}%</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Overall Budget Used</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Across {campaigns.length} campaigns</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-red-600 tracking-tight leading-none">{overpacing.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Overpacing</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Risk of exceeding budget</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-amber-600 tracking-tight leading-none">{underpacing.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Underpacing</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">Leaving budget unspent</div>
        </div>
      </div>

      {/* Alerts */}
      {(overpacing.length > 0 || underpacing.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {overpacing.map(r => (
            <div key={r.id} className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-red-700">
                <span className="font-semibold">{r.name}</span> is pacing {Math.round(r.status.diff)}pt ahead of schedule — on track to exceed its ${r.monthlyBudget.toLocaleString()} budget.
              </div>
            </div>
          ))}
          {underpacing.map(r => (
            <div key={r.id} className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <TrendingDown className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-700">
                <span className="font-semibold">{r.name}</span> is pacing {Math.round(Math.abs(r.status.diff))}pt behind schedule — ${r.remaining.toLocaleString()} left unspent.
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Campaign Pacing</h2>
          <p className="text-xs text-gray-500 mt-0.5">Actual spend vs. expected spend for the current 30-day cycle</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Campaign</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Budget</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Spend</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Daily Target</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pace</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(r => {
                const tc = toneCfg[r.status.tone];
                const pct = Math.min(100, Math.round((r.spend / r.monthlyBudget) * 100));
                return (
                  <tr key={r.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium text-gray-900 leading-tight">{r.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{r.platform} · day {Math.min(r.elapsed, CYCLE_DAYS)} of {CYCLE_DAYS}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">${r.monthlyBudget.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-bold text-gray-900">${r.spend.toLocaleString()}</div>
                      <div className="w-24 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div className={`h-full rounded-full ${tc.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">${r.dailyTarget.toFixed(0)}/day</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tc.text}`}>
                        {r.status.diff >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {r.status.diff >= 0 ? "+" : ""}{r.status.diff.toFixed(0)}pt
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>
                        {r.status.tone === "emerald" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {r.status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
