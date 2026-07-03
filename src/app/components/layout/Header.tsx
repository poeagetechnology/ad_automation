import { Search, Bell, ChevronDown, Calendar } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 bg-white border-b border-gray-200/80 flex items-center px-5 gap-3 flex-shrink-0 z-10">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search campaigns, leads, reports..."
          className="w-full pl-9 pr-10 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center text-[10px] text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Date range */}
      <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
        <Calendar className="w-3.5 h-3.5 text-gray-500" />
        <span>Jun 3 — Jul 3, 2025</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      {/* Connection badges */}
      <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-blue-700">Meta</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700">Google</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          <span className="text-xs font-semibold text-amber-700">HubSpot</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1.5" />
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            AJ
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-xs font-semibold text-gray-900">Alex Johnson</div>
            <div className="text-[11px] text-gray-400">Admin</div>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
