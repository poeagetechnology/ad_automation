import { useMemo, useState } from "react";
import {
  DollarSign, TrendingDown, Users, Settings as SettingsIcon, CheckCheck, Circle,
} from "lucide-react";
import { AppNotification, NotificationType } from "../lib/data";

type TypeFilter = "All" | "Unread" | NotificationType;

const typeIcon: Record<NotificationType, React.ElementType> = {
  budget: DollarSign, roas: TrendingDown, lead: Users, system: SettingsIcon,
};

const severityCfg = {
  critical: { bg: "bg-red-50",    text: "text-red-600"    },
  warning:  { bg: "bg-amber-50",  text: "text-amber-600"  },
  info:     { bg: "bg-blue-50",   text: "text-blue-600"   },
};

interface NotificationsCenterProps {
  notifications: AppNotification[];
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
}

export function NotificationsCenter({ notifications, onMarkRead, onMarkAllRead }: NotificationsCenterProps) {
  const [filter, setFilter] = useState<TypeFilter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return notifications;
    if (filter === "Unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  }, [notifications, filter]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Notifications Center</h1>
          <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread of {notifications.length} total</p>
        </div>
        <button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {(["All", "Unread", "budget", "roas", "lead", "system"] as TypeFilter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border capitalize transition-colors ${
              filter === f
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden divide-y divide-gray-50">
        {filtered.map(n => {
          const TypeIcon = typeIcon[n.type];
          const sc = severityCfg[n.severity];
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-5 py-3.5 transition-colors ${n.read ? "bg-white" : "bg-blue-50/30"} hover:bg-gray-50/70`}
            >
              <div className={`p-1.5 rounded-md flex-shrink-0 mt-0.5 ${sc.bg}`}>
                <TypeIcon className={`w-3.5 h-3.5 ${sc.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${n.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>{n.message}</p>
                <div className="text-xs text-gray-400 mt-1 capitalize">{n.type} · {n.time}</div>
              </div>
              {!n.read && (
                <button
                  onClick={() => onMarkRead(n.id)}
                  title="Mark as read"
                  className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors flex-shrink-0"
                >
                  <Circle className="w-3 h-3 fill-current" />
                </button>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-400">Nothing here.</div>
        )}
      </div>

      <div className="h-4" />
    </>
  );
}
