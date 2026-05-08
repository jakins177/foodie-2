import Image from "next/image";
import { HistoryEntry } from "@/lib/types";

export function HistoryList({ items }: { items: HistoryEntry[] }) {
  return (
    <div className="card-surface p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Food history</h2>
      {items.length === 0 ? (
        <p className="mt-3 rounded-xl border border-dashed border-white/20 p-4 text-sm text-slate-300">
          No meals logged yet. Upload your first photo to build history.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.id + item.timestamp} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <Image src={item.imageUrl} alt={item.foodName} width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-medium">{item.foodName}</p>
                <p className="text-xs text-slate-300">{item.macros.calories} kcal</p>
                <p className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
