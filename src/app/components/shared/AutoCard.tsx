import { AutoRule, typeCfg } from "../../lib/data";
import { Toggle } from "./Toggle";

export function AutoCard({ rule, active, onToggle }: { rule: AutoRule; active: boolean; onToggle: () => void }) {
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
