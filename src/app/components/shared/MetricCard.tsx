import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  label: string; value: string; change: string; positive: boolean; sub: string;
  icon: React.ReactNode; accentColor: string;
}

export function MetricCard({ label, value, change, positive, sub, icon, accentColor }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${accentColor}`}>{icon}</div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
            positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{value}</div>
        <div className="text-xs font-medium text-gray-500 mt-1.5">{label}</div>
      </div>
      <div className="text-xs text-gray-400 border-t border-gray-50 pt-2.5">{sub}</div>
    </div>
  );
}
