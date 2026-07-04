import { Plus, FlaskConical, Trophy } from "lucide-react";
import { experiments, ExperimentStatus, ExperimentVariant } from "../lib/data";

const statusCfg: Record<ExperimentStatus, { bg: string; text: string; dot: string }> = {
  Running:   { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500"  },
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Draft:     { bg: "bg-gray-100",   text: "text-gray-500",    dot: "bg-gray-400"  },
};

function convRate(v: ExperimentVariant) {
  return v.visitors > 0 ? (v.conversions / v.visitors) * 100 : 0;
}

export function ABTesting() {
  const running = experiments.filter(e => e.status === "Running").length;
  const completed = experiments.filter(e => e.status === "Completed").length;
  const significant = experiments.filter(e => e.confidence >= 95).length;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">A/B Testing</h1>
          <p className="text-xs text-gray-500 mt-0.5">{experiments.length} experiments · {running} running</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
          <Plus className="w-3.5 h-3.5" />
          New Experiment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{running}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Running</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{completed}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Completed</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600 tracking-tight leading-none">{significant}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Statistically Significant</div>
          <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">≥95% confidence</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{experiments.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Total Experiments</div>
        </div>
      </div>

      {/* Experiment cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {experiments.map(exp => {
          const sc = statusCfg[exp.status];
          const rateA = convRate(exp.variantA);
          const rateB = convRate(exp.variantB);
          const winner = exp.status === "Draft" ? null : rateB > rateA ? "B" : rateA > rateB ? "A" : null;
          const maxRate = Math.max(rateA, rateB, 0.1);

          return (
            <div key={exp.id} className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-md bg-purple-50 flex-shrink-0 mt-0.5">
                    <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 leading-tight truncate">{exp.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{exp.campaign} · started {exp.startDate}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${sc.bg} ${sc.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {exp.status}
                </span>
              </div>

              {exp.status === "Draft" ? (
                <div className="text-xs text-gray-400 py-6 text-center border-t border-gray-50">
                  Not yet launched — variants awaiting activation.
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  {[
                    { key: "A", v: exp.variantA, rate: rateA },
                    { key: "B", v: exp.variantB, rate: rateB },
                  ].map(({ key, v, rate }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                          {v.name}
                          {winner === key && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600">
                              <Trophy className="w-3 h-3" /> Winning
                            </span>
                          )}
                        </span>
                        <span className="text-xs font-bold text-gray-900">{rate.toFixed(2)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${winner === key ? "bg-emerald-500" : "bg-gray-300"}`}
                          style={{ width: `${(rate / maxRate) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {v.conversions.toLocaleString()} conversions / {v.visitors.toLocaleString()} visitors
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400">Confidence</span>
                    <span className={`text-xs font-bold ${exp.confidence >= 95 ? "text-emerald-600" : "text-gray-600"}`}>
                      {exp.confidence}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="h-4" />
    </>
  );
}
