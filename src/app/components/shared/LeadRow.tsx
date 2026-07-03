import { Mail, MessageSquare, MoreHorizontal } from "lucide-react";
import { Lead, statusCfg, sourceCfg } from "../../lib/data";

export function LeadRow({ lead }: { lead: Lead }) {
  const sc = statusCfg[lead.status];
  const src = sourceCfg[lead.source] ?? { bg: "bg-gray-100", text: "text-gray-600" };
  const initials = lead.name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <tr className="hover:bg-gray-50/70 transition-colors group">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 leading-tight">{lead.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{lead.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${src.bg} ${src.text}`}>
          {lead.source}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {lead.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm font-bold text-gray-900">{lead.value}</span>
        <div className="text-xs text-gray-400">{lead.time}</div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
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
}
