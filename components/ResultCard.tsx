import { AnalysisResult } from "@/lib/types";

export function ResultCard({ result }: { result: AnalysisResult | null }) {
  if (!result) {
    return (
      <div className="card-surface p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Results</h2>
        <p className="mt-2 text-sm text-slate-300">Upload and analyze a meal photo to see estimated nutrition data.</p>
      </div>
    );
  }

  const { foodName, macros, confidence, notes } = result;
  return (
    <div className="card-surface p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Analysis result</h2>
      <p className="mt-1 text-cyan-200">{foodName}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-slate-300">Calories</p>
          <p className="text-xl font-semibold">{macros.calories}</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-slate-300">Protein</p>
          <p className="text-xl font-semibold">{macros.protein}g</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-slate-300">Carbs</p>
          <p className="text-xl font-semibold">{macros.carbs}g</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-slate-300">Fat</p>
          <p className="text-xl font-semibold">{macros.fat}g</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-300">Confidence: {(confidence * 100).toFixed(0)}%</p>
      <p className="mt-1 text-xs text-slate-400">{notes}</p>
      <p className="mt-3 rounded-lg bg-amber-400/15 px-3 py-2 text-xs text-amber-100">
        Disclaimer: values are estimates and not medical guidance.
      </p>
    </div>
  );
}
