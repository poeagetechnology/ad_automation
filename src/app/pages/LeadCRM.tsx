import { useMemo, useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { leads, LeadStatus } from "../lib/data";
import { LeadRow } from "../components/shared/LeadRow";

type StatusFilter = "All" | LeadStatus;

export function LeadCRM() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      const matchesQuery =
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.email.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [statusFilter, query]);

  const counts = {
    New: leads.filter(l => l.status === "New").length,
    Contacted: leads.filter(l => l.status === "Contacted").length,
    Qualified: leads.filter(l => l.status === "Qualified").length,
  };
  const totalValue = leads.reduce((sum, l) => sum + Number(l.value.replace(/[^0-9]/g, "")), 0);

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Lead CRM</h1>
          <p className="text-xs text-gray-500 mt-0.5">{leads.length} leads · synced from Meta, Google &amp; HubSpot</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
            <Plus className="w-3.5 h-3.5" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "New", value: String(counts.New), color: "text-blue-600" },
          { label: "Contacted", value: String(counts.Contacted), color: "text-amber-600" },
          { label: "Qualified", value: String(counts.Qualified), color: "text-emerald-600" },
          { label: "Pipeline Value", value: `$${totalValue.toLocaleString()}`, color: "text-gray-900" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className={`text-2xl font-bold tracking-tight leading-none ${s.color}`}>{s.value}</div>
            <div className="text-xs font-medium text-gray-500 mt-1.5">{s.label}</div>
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
              placeholder="Search leads..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-0.5">
              {(["All", "New", "Contacted", "Qualified"] as StatusFilter[]).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    statusFilter === s
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {s}
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
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lead</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Value</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(lead => <LeadRow key={lead.id} lead={lead} />)}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                    No leads match your filters.
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
