import { useMemo, useState } from "react";
import {
  Plus, Image as ImageIcon, Video, GalleryHorizontal, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { creatives as initialCreatives, CreativeType, Platform } from "../lib/data";

type TypeFilter = "All" | CreativeType;

const typeIcon: Record<CreativeType, React.ElementType> = {
  Image: ImageIcon, Video: Video, Carousel: GalleryHorizontal,
};

const gradients: Record<Platform, string> = {
  Meta: "from-indigo-500 to-blue-500",
  Google: "from-red-500 to-amber-500",
};

function fatigueTone(fatigue: number) {
  if (fatigue >= 66) return { label: "Fatigued", bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500" };
  if (fatigue >= 33) return { label: "Monitor", bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-400" };
  return { label: "Fresh", bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500" };
}

export function CreativeStudio() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const creatives = initialCreatives;

  const filtered = useMemo(
    () => creatives.filter(c => typeFilter === "All" || c.type === typeFilter),
    [creatives, typeFilter]
  );

  const fatigued = creatives.filter(c => c.fatigue >= 66).length;
  const avgCtr = creatives.reduce((s, c) => s + c.ctr, 0) / creatives.length;

  return (
    <>
      {/* Page heading */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900">Creative Studio</h1>
          <p className="text-xs text-gray-500 mt-0.5">{creatives.length} creatives across Meta &amp; Google</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/30">
          <Plus className="w-3.5 h-3.5" />
          Upload Creative
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{creatives.length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Total Creatives</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{avgCtr.toFixed(1)}%</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Avg. CTR</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-red-600 tracking-tight leading-none">{fatigued}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Fatigued — Needs Refresh</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{creatives.filter(c => c.status === "Active").length}</div>
          <div className="text-xs font-medium text-gray-500 mt-1.5">Active in Rotation</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5">
        {(["All", "Image", "Video", "Carousel"] as TypeFilter[]).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              typeFilter === t
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => {
          const TypeIcon = typeIcon[c.type];
          const tone = fatigueTone(c.fatigue);
          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className={`h-28 bg-gradient-to-br ${gradients[c.platform]} flex items-center justify-center relative`}>
                <TypeIcon className="w-8 h-8 text-white/90" />
                <span className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-white backdrop-blur-sm">
                  {c.type}
                </span>
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  c.status === "Active" ? "bg-emerald-500/90 text-white" : "bg-gray-500/80 text-white"
                }`}>
                  {c.status}
                </span>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-900 leading-tight truncate">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{c.campaign}</div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-50 text-center">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{(c.impressions / 1000).toFixed(0)}K</div>
                    <div className="text-[10px] text-gray-400">Impr.</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{c.ctr.toFixed(1)}%</div>
                    <div className="text-[10px] text-gray-400">CTR</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">${c.cpm.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-400">CPM</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-2">
                    <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${c.fatigue}%` }} />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${tone.bg} ${tone.text}`}>
                    {tone.label === "Fatigued" ? <AlertTriangle className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                    {tone.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-4" />
    </>
  );
}
