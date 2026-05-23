import { User, Briefcase, GraduationCap, Users, DollarSign, RefreshCw } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function SidebarForm() {
  const inputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-on-surface text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm";
  const labelClass = "block text-sm text-on-surface-variant mb-1 font-medium";
  const numberInputClass = "w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-on-surface text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono font-medium shadow-sm";

  return (
    <section className="w-full md:w-[40%] bg-surface-container-low border-r border-outline-variant flex flex-col h-full z-10 relative">
      <div className="p-6 border-b border-outline-variant shrink-0 bg-surface-container flex justify-between items-center">
        <h2 className="text-xl font-semibold text-on-surface">Subject Profile</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-outline-variant rounded text-on-surface-variant text-sm hover:text-primary hover:border-primary transition-colors bg-surface-container-high">
            Load Example
          </button>
          <button className="px-3 py-1.5 border border-outline-variant rounded text-on-surface-variant text-sm hover:text-error hover:border-error transition-colors bg-surface-container-high">
            Reset Form
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Demographics */}
        <div className="bg-surface-container-high shadow-sm rounded-lg border border-outline-variant p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
            <User className="w-4 h-4" /> Demographics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Age</label>
              <input type="number" defaultValue="35" className={numberInputClass} />
            </div>
            <div>
              <label className={labelClass}>Sex</label>
              <select className={inputClass} defaultValue="Male">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Race</label>
              <select className={inputClass} defaultValue="White">
                <option>White</option>
                <option>Black</option>
                <option>Asian-Pac-Islander</option>
                <option>Amer-Indian-Eskimo</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Native Country</label>
              <select className={inputClass} defaultValue="United-States">
                <option>United-States</option>
                <option>Mexico</option>
                <option>Philippines</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>

        {/* Work & Occupation */}
        <div className="bg-surface-container-high shadow-sm rounded-lg border border-outline-variant p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
            <Briefcase className="w-4 h-4" /> Work & Occupation
          </h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Workclass</label>
              <select className={inputClass} defaultValue="Private">
                <option>Private</option>
                <option>Self-emp-not-inc</option>
                <option>Local-gov</option>
                <option>State-gov</option>
                <option>Federal-gov</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Occupation</label>
              <select className={inputClass} defaultValue="Exec-managerial">
                <option>Exec-managerial</option>
                <option>Prof-specialty</option>
                <option>Craft-repair</option>
                <option>Sales</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Hours / Week</label>
              <input type="number" defaultValue="40" className={numberInputClass} />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-surface-container-high shadow-sm rounded-lg border border-outline-variant p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
            <GraduationCap className="w-4 h-4" /> Education
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Level</label>
              <select className={inputClass} defaultValue="Bachelors">
                <option>Bachelors</option>
                <option>Some-college</option>
                <option>11th</option>
                <option>HS-grad</option>
                <option>Prof-school</option>
              </select>
            </div>
            <div>
               <label className={labelClass}>Education Num</label>
               <input type="number" defaultValue="13" className={numberInputClass} />
            </div>
          </div>
        </div>

        {/* Family */}
        <div className="bg-surface-container-high shadow-sm rounded-lg border border-outline-variant p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
            <Users className="w-4 h-4" /> Family
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Marital Status</label>
              <select className={inputClass} defaultValue="Married-civ-spouse">
                <option>Married-civ-spouse</option>
                <option>Never-married</option>
                <option>Divorced</option>
                <option>Separated</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Relationship</label>
              <select className={inputClass} defaultValue="Husband">
                <option>Husband</option>
                <option>Not-in-family</option>
                <option>Own-child</option>
                <option>Unmarried</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial */}
        <div className="bg-surface-container-high shadow-sm rounded-lg border border-outline-variant p-4">
           <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
             <DollarSign className="w-4 h-4" /> Financial
           </h3>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className={labelClass}>Capital Gain</label>
               <input type="number" defaultValue="14084" className={numberInputClass} />
             </div>
             <div>
               <label className={labelClass}>Capital Loss</label>
               <input type="number" defaultValue="0" className={numberInputClass} />
             </div>
           </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="p-6 border-t border-outline-variant bg-surface-container shrink-0">
        <motion.button 
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-lg py-4 rounded-lg flex items-center justify-center gap-3 shadow-neon-primary transition-all"
        >
          <RefreshCw className="w-5 h-5 animate-spin" />
          Predict Donor Potential
        </motion.button>
      </div>
    </section>
  );
}
