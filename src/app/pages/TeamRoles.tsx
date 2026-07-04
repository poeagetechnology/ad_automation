import { useState } from "react";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { TeamMember, TeamRole } from "../lib/data";

const roleCfg: Record<TeamRole, { bg: string; text: string }> = {
  Admin:  { bg: "bg-purple-50",  text: "text-purple-700"  },
  Editor: { bg: "bg-blue-50",    text: "text-blue-700"    },
  Viewer: { bg: "bg-gray-100",   text: "text-gray-600"    },
};

interface TeamRolesProps {
  members: TeamMember[];
  onUpdateRole: (id: number, role: TeamRole) => void;
  onInvite: (email: string, role: TeamRole) => void;
}

export function TeamRoles({ members, onUpdateRole, onInvite }: TeamRolesProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Viewer");

  const sendInvite = () => {
    const email = inviteEmail.trim();
    if (!email) return;
    onInvite(email, inviteRole);
    setInviteEmail("");
    setInviteRole("Viewer");
  };

  const activeCount = members.filter(m => m.status === "Active").length;
  const invitedCount = members.filter(m => m.status === "Invited").length;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Team &amp; Roles</h1>
          <p className="text-xs text-gray-500 mt-0.5">{members.length} members · {activeCount} active · {invitedCount} pending</p>
        </div>
      </div>

      {/* Invite form */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 flex flex-wrap items-center gap-2">
        <UserPlus className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="email"
          value={inviteEmail}
          onChange={e => setInviteEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendInvite()}
          placeholder="teammate@company.com"
          className="flex-1 min-w-[180px] px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
        />
        <select
          value={inviteRole}
          onChange={e => setInviteRole(e.target.value as TeamRole)}
          className="px-3 py-1.5 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button
          onClick={sendInvite}
          disabled={!inviteEmail.trim()}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Send Invite
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Member</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map(m => {
                const initials = m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={m.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">{m.name}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={m.role}
                        onChange={e => onUpdateRole(m.id, e.target.value as TeamRole)}
                        className={`text-xs font-semibold px-2 py-1 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${roleCfg[m.role].bg} ${roleCfg[m.role].text}`}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                        m.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === "Active" ? "bg-emerald-500" : "bg-amber-400"}`} />
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{m.lastActive}</td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
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
