import { CheckCircle, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <section className="w-full md:w-[60%] flex flex-col h-full bg-surface-container-lowest z-10">
      {/* Tabs */}
      <div className="flex px-6 pt-4 border-b border-outline-variant bg-surface-container-highest shrink-0 overflow-x-auto">
        <button className="px-6 py-3 font-medium text-primary border-b-2 border-primary bg-surface-container rounded-t-lg shadow-sm whitespace-nowrap">
          Prediction Results
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        
        {/* Main Result Card */}
        <div className="bg-surface-container-high border border-outline-variant border-t-4 border-t-tertiary rounded-lg p-6 md:p-8 relative overflow-hidden shadow-neon-success">
          {/* Subtle success glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-[60px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Prediction Outcome
              </h3>
              <div className="text-4xl md:text-5xl font-extrabold text-tertiary flex items-center gap-4 tracking-tight">
                Potential Donor
                <CheckCircle className="w-10 h-10" />
              </div>
              <p className="text-base text-on-surface mt-4">
                The model predicts this individual earns &gt; $50K annually.
              </p>
            </div>

            {/* Gauge */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" strokeWidth="8" 
                  className="stroke-surface-container-lowest"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeDasharray="282.7" strokeDashoffset="35.6"
                  className="stroke-tertiary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-3xl font-bold text-on-surface">87.4%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">Confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-surface-container-high rounded-lg border border-outline-variant p-6 md:p-8">
          <h3 className="text-xl font-semibold text-on-surface mb-6 flex items-center gap-2 border-b border-outline-variant pb-4">
            <BarChart3 className="w-6 h-6 text-primary" />
            Feature Importance
          </h3>

          <div className="space-y-6 mt-6">
            {/* Chart Bar 1 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface font-medium">Capital Gain</span>
                <span className="text-primary font-mono font-medium">0.42</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-outline-variant/30">
                <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Chart Bar 2 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface font-medium">Age</span>
                <span className="text-primary font-mono font-medium">0.24</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-outline-variant/30">
                <div className="bg-primary/80 h-full rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            {/* Chart Bar 3 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface font-medium">Education Num</span>
                <span className="text-primary font-mono font-medium">0.18</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-outline-variant/30">
                <div className="bg-primary/60 h-full rounded-full" style={{ width: '36%' }}></div>
              </div>
            </div>

            {/* Chart Bar 4 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-on-surface font-medium">Hours per Week</span>
                <span className="text-primary font-mono font-medium">0.11</span>
              </div>
              <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden border border-outline-variant/30">
                <div className="bg-primary/40 h-full rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
