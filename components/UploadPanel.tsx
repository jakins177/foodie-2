import Image from "next/image";

interface UploadPanelProps {
  imagePreview: string | null;
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

export function UploadPanel({ imagePreview, onFileChange, onAnalyze, loading, error }: UploadPanelProps) {
  return (
    <div className="card-surface p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Upload food photo</h2>
      <p className="mt-1 text-sm text-slate-300">Choose an image to simulate AI-based meal analysis.</p>

      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-900/60 p-6 text-center transition hover:border-cyan-200/40">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
        <span className="text-sm text-slate-200">Tap to select a photo</span>
      </label>

      {imagePreview && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <Image src={imagePreview} width={600} height={360} alt="Food preview" className="h-56 w-full object-cover" />
        </div>
      )}

      {error && <p className="mt-3 rounded-lg bg-rose-500/20 px-3 py-2 text-sm text-rose-200">{error}</p>}

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-4 w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Analyzing your meal..." : "Analyze"}
      </button>
    </div>
  );
}
