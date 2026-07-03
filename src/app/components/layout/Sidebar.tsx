import { Activity, ChevronLeft, Settings } from "lucide-react";
import { navItems } from "../../lib/data";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  activeNav: string;
  onSelect: (label: string) => void;
}

export function Sidebar({ collapsed, onToggleCollapsed, activeNav, onSelect }: SidebarProps) {
  return (
    <aside
      className={`${collapsed ? "w-[68px]" : "w-[232px]"} bg-[#0D1117] flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/10 flex-shrink-0">
        {collapsed ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
            <Activity className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight">MarketOS</div>
              <div className="text-gray-600 text-[10px] font-medium uppercase tracking-widest">Enterprise</div>
            </div>
          </div>
        )}
      </div>

      {/* Section label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-1.5">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em]">Main Menu</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-hidden">
        {navItems.map(({ icon: Icon, label, badge }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left font-medium">{label}</span>
                  {badge && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? "bg-white/25 text-white" : "bg-white/10 text-gray-400"
                    }`}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2 space-y-0.5">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-100 truncate">Alex Johnson</div>
              <div className="text-[11px] text-gray-500 truncate">alex@company.com</div>
            </div>
            <Settings className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          </div>
        )}
        <button
          onClick={onToggleCollapsed}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-colors text-sm ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
