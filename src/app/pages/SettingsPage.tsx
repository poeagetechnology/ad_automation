import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Toggle } from "../components/shared/Toggle";

const notifPrefs = [
  { key: "budgetAlerts",  label: "Budget pacing alerts",      desc: "Get notified when a campaign over/underspends" },
  { key: "roasAlerts",    label: "ROAS drop alerts",          desc: "Get notified when ROAS falls below threshold" },
  { key: "leadAlerts",    label: "New lead notifications",    desc: "Get notified when a new lead comes in" },
  { key: "weeklyDigest",  label: "Weekly performance digest", desc: "Email summary every Monday morning" },
] as const;

export function SettingsPage() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@company.com");
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    budgetAlerts: true, roasAlerts: true, leadAlerts: true, weeklyDigest: false,
  });

  const togglePref = (key: string) => setPrefs(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your profile and workspace preferences</p>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 max-w-xl">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Profile</h2>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{name}</div>
            <div className="text-xs text-gray-400">Admin · MarketOS Enterprise</div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Full name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30"
          >
            Save Changes
          </button>
          {saved && <span className="text-xs font-medium text-emerald-600">Saved ✓</span>}
        </div>
      </div>

      {/* Notification preferences */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 max-w-xl">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Notification Preferences</h2>
        <p className="text-xs text-gray-500 mb-4">Choose what shows up in your Notifications Center</p>
        <div className="divide-y divide-gray-50">
          {notifPrefs.map(p => (
            <div key={p.key} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 pr-4">
                <div className="text-sm font-medium text-gray-900">{p.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{p.desc}</div>
              </div>
              <Toggle checked={prefs[p.key]} onChange={() => togglePref(p.key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl border border-red-100 shadow-sm p-5 max-w-xl">
        <h2 className="text-sm font-bold text-red-600 mb-1 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h2>
        <p className="text-xs text-gray-500 mb-4">These actions are irreversible — proceed with caution.</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">Delete this workspace</div>
            <div className="text-xs text-gray-400 mt-0.5">Removes all campaigns, leads and automation history</div>
          </div>
          <button className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
            Delete Workspace
          </button>
        </div>
      </div>

      <div className="h-4" />
    </>
  );
}
