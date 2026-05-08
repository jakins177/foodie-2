export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-cyan-400/20 via-indigo-500/20 to-purple-500/20 p-6 sm:p-10 shadow-glow">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />
      <p className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-100">
        AI Nutrition Coach (Mocked v1)
      </p>
      <h1 className="max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl">
        Snap your meal. Get instant calorie and macro estimates.
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-100/90 sm:text-base">
        NutriLens is a premium mobile-first experience inspired by modern AI wellness products.
      </p>
      <button
        onClick={onGetStarted}
        className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.01] hover:bg-cyan-50"
      >
        Start Tracking
      </button>
    </section>
  );
}
