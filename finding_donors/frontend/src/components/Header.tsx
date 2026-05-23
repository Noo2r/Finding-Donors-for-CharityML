import { Brain, BarChart3, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-surface-container border-b border-outline-variant flex justify-between items-center w-full px-6 h-16 shrink-0 z-20 relative">
      <div className="flex items-center gap-4">
        <Brain className="text-primary w-8 h-8" />
        <div>
          <h1 className="text-xl font-bold text-on-surface leading-none mb-1 tracking-tight">
            CharityML Donor Prediction
          </h1>
          <p className="text-sm text-on-surface-variant leading-none">
            Predict whether an individual earns &gt; $50K
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pl-4">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-surface-container-highest">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-surface-container-highest">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
