import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { autoRules, typeCfg, AutoType } from "../lib/data";
import { AutoCard } from "../components/shared/AutoCard";

type TypeFilter = "All" | AutoType;

interface AutomationRulesProps {
  autoStates: Record<number, boolean>;
  toggleAuto: (id: number) => void;
}

export function AutomationRules({ autoStates, toggleAuto }: AutomationRulesProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");

  const activeCount = Object.values(autoStates).filter(Boolean).length;
  const filtered = useMemo(
    () => autoRules.filter(r => typeFilter === "All" || r.type === typeFilter),
    [typeFilter]
  );

  const platformsCovered = new Set(autoRules.map(r => r.platform)).size;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Automation Rules</h1>
          <p className="text-xs text-gray-500 mt-0.5">{activeCount} of {autoRules.length} rules running</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
          <Plus className="w-3.5 h-3.5" />
          New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Active Rules", value: `${activeCount}`, sub: `of ${autoRules.length} total` },
          { label: "Paused Rules", value: `${autoRules.length - activeCount}`, sub: "Not currently running" },
          { label: "Platforms Covered", value: String(platformsCovered), sub: "Meta, Google, Both, CRM" },
          { label: "Triggered Today", value: "3", sub: "Across all active rules" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{s.value}</div>
            <div className="text-xs font-medium text-gray-500 mt-1.5">{s.label}</div>
            <div className="text-xs text-gray-400 border-t border-gray-50 mt-2.5 pt-2.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setTypeFilter("All")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            typeFilter === "All"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Types
        </button>
        {(Object.keys(typeCfg) as AutoType[]).map(type => {
          const cfg = typeCfg[type];
          const isActive = typeFilter === type;
          return (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                isActive ? `${cfg.bg} ${cfg.text} border-transparent` : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <cfg.Icon className="w-3 h-3" />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(rule => (
          <AutoCard
            key={rule.id}
            rule={rule}
            active={autoStates[rule.id]}
            onToggle={() => toggleAuto(rule.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-400 py-10">
            No rules match this filter.
          </div>
        )}
      </div>

      <div className="h-4" />
    </>
  );
}
