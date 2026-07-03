interface TooltipItem { name: string; value: number; color: string }

export function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: TooltipItem[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D1117] rounded-xl px-3.5 py-3 shadow-2xl border border-white/10">
      <div className="text-xs text-gray-400 mb-2 font-medium">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-gray-300">{p.name}</span>
          <span className="text-white font-bold ml-auto pl-3">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
