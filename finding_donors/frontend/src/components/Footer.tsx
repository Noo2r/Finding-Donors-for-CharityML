export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant flex justify-between items-center w-full px-6 py-2 shrink-0 z-20 relative text-xs">
      <div className="flex gap-4 items-center">
        <span className="text-tertiary font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3]"></span>
          Ready
        </span>
        <span className="text-on-surface-variant font-bold uppercase tracking-wider border-l border-outline-variant pl-4">
          Model: v2.4-Hybrid
        </span>
        <span className="text-on-surface-variant font-bold uppercase tracking-wider border-l border-outline-variant pl-4">
          Built by Predictive Insights
        </span>
      </div>
      <div className="text-on-surface-variant font-bold uppercase tracking-wider">
        © 2024 CharityML Enterprise.
      </div>
    </footer>
  );
}
