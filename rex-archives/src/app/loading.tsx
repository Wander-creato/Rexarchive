export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f172a] px-5 py-20 text-slate-200 md:px-8">
      <div className="mx-auto w-[min(100%,76rem)] animate-pulse space-y-4">
        <div className="h-4 w-48 rounded-full bg-white/10" />
        <div className="h-12 w-3/4 rounded-2xl bg-white/10" />
        <div className="h-6 w-2/3 rounded-xl bg-white/10" />
        <div className="mt-6 h-80 rounded-3xl bg-white/10" />
      </div>
    </div>
  );
}
