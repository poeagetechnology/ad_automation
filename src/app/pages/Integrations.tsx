import { useState } from "react";
import { Plug, CheckCircle2, RefreshCw } from "lucide-react";
import { integrations as initialIntegrations } from "../lib/data";

export function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggleConnection = (id: number) =>
    setIntegrations(prev => prev.map(i =>
      i.id === id
        ? {
            ...i,
            status: i.status === "Connected" ? "Not Connected" : "Connected",
            lastSync: i.status === "Connected" ? "—" : "Just now",
          }
        : i
    ));

  const connectedCount = integrations.filter(i => i.status === "Connected").length;
  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Integrations</h1>
          <p className="text-xs text-gray-500 mt-0.5">{connectedCount} of {integrations.length} apps connected</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600 tracking-tight leading-none">{connectedCount}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Connected</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{integrations.length - connectedCount}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Available</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{categories.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Categories</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{integrations.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Total Available</div>
        </div>
      </div>

      {/* Grid grouped by category */}
      {categories.map(category => (
        <div key={category}>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-1">
            {integrations.filter(i => i.category === category).map(i => (
              <div key={i.id} className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Plug className="w-4 h-4 text-blue-600" />
                  </div>
                  {i.status === "Connected" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{i.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    {i.status === "Connected" ? (
                      <>
                        <RefreshCw className="w-3 h-3" /> Synced {i.lastSync}
                      </>
                    ) : (
                      "Not connected"
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleConnection(i.id)}
                  className={`mt-1 w-full py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    i.status === "Connected"
                      ? "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {i.status === "Connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="h-4" />
    </>
  );
}
