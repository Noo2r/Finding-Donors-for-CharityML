import React, { useState } from 'react';
import { 
  Brain, User, Briefcase, GraduationCap, Users, DollarSign, 
  CheckCircle, AlertTriangle, RefreshCw, Upload, Activity, 
  Settings, HelpCircle, FileText
} from 'lucide-react';

const WORKCLASS_OPTIONS = ["Federal-gov", "Local-gov", "Private", "Self-emp-inc", "Self-emp-not-inc", "State-gov", "Without-pay"];
const EDUCATION_OPTIONS = ["10th", "11th", "12th", "1st-4th", "5th-6th", "7th-8th", "9th", "Assoc-acdm", "Assoc-voc", "Bachelors", "Doctorate", "HS-grad", "Masters", "Preschool", "Prof-school", "Some-college"];
const MARITAL_OPTIONS = ["Divorced", "Married-AF-spouse", "Married-civ-spouse", "Married-spouse-absent", "Never-married", "Separated", "Widowed"];
const OCCUPATION_OPTIONS = ["Adm-clerical", "Armed-Forces", "Craft-repair", "Exec-managerial", "Farming-fishing", "Handlers-cleaners", "Machine-op-inspct", "Other-service", "Priv-house-serv", "Prof-specialty", "Protective-serv", "Sales", "Tech-support", "Transport-moving"];
const RELATIONSHIP_OPTIONS = ["Husband", "Not-in-family", "Other-relative", "Own-child", "Unmarried", "Wife"];
const RACE_OPTIONS = ["Amer-Indian-Eskimo", "Asian-Pac-Islander", "Black", "Other", "White"];
const SEX_OPTIONS = ["Female", "Male"];
const COUNTRY_OPTIONS = ["Cambodia", "Canada", "China", "Columbia", "Cuba", "Dominican-Republic", "Ecuador", "El-Salvador", "England", "France", "Germany", "Greece", "Guatemala", "Haiti", "Holand-Netherlands", "Honduras", "Hong", "Hungary", "India", "Iran", "Ireland", "Italy", "Jamaica", "Japan", "Laos", "Mexico", "Nicaragua", "Outlying-US(Guam-USVI-etc)", "Peru", "Philippines", "Poland", "Portugal", "Puerto-Rico", "Scotland", "South", "Taiwan", "Thailand", "Trinadad&Tobago", "United-States", "Vietnam", "Yugoslavia"];

const DEFAULT_STATE = {
  age: 35, sex: "Male", race: "White", "native-country": "United-States",
  workclass: "Private", occupation: "Exec-managerial", "hours-per-week": 40,
  education_level: "Bachelors", "education-num": 13,
  "marital-status": "Married-civ-spouse", relationship: "Husband",
  "capital-gain": 0, "capital-loss": 0
};

function App() {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }));
  };

  const loadExample = () => {
    setFormData({
      age: 45, sex: "Male", race: "White", "native-country": "United-States",
      workclass: "Private", occupation: "Exec-managerial", "hours-per-week": 55,
      education_level: "Masters", "education-num": 14,
      "marital-status": "Married-civ-spouse", relationship: "Husband",
      "capital-gain": 15000, "capital-loss": 0
    });
  };

  const resetForm = () => {
    setFormData(DEFAULT_STATE);
    setResult(null);
    setError("");
  };

  const predict = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Prediction failed. Ensure Flask backend is running.');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // SVG Circular Gauge
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result 
    ? circumference - (result.confidence * circumference) 
    : circumference;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-purple-50 p-2 rounded-lg">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">CharityML Donor Prediction</h1>
            <p className="text-sm text-slate-500">Predict whether an individual earns &gt; $50K</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-slate-400 cursor-pointer hover:text-purple-600" />
            <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-purple-600" />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 flex gap-8">
        
        {/* LEFT SIDEBAR (FORM) */}
        <div className="w-[380px] shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Subject Profile</h2>
            <div className="flex gap-2">
              <button onClick={loadExample} className="text-xs px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100 font-medium text-slate-700">Load Example</button>
              <button onClick={resetForm} className="text-xs px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-100 font-medium text-slate-700">Reset Form</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4 custom-scrollbar">
            
            {/* Demographics */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Demographics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Sex</label>
                  <select name="sex" value={formData.sex} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {SEX_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Race</label>
                  <select name="race" value={formData.race} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {RACE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Native Country</label>
                  <select name="native-country" value={formData["native-country"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {COUNTRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Work */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Work & Occupation</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Workclass</label>
                  <select name="workclass" value={formData.workclass} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {WORKCLASS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Occupation</label>
                  <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {OCCUPATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Hours / Week</label>
                  <input type="number" name="hours-per-week" value={formData["hours-per-week"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Education Level</label>
                  <select name="education_level" value={formData.education_level} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {EDUCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Education Num (years)</label>
                  <input type="number" name="education-num" value={formData["education-num"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Family */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Family & Relationship</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Marital Status</label>
                  <select name="marital-status" value={formData["marital-status"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {MARITAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Relationship</label>
                  <select name="relationship" value={formData.relationship} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none">
                    {RELATIONSHIP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Financial */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-purple-600">Financial Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Capital Gain ($)</label>
                  <input type="number" name="capital-gain" value={formData["capital-gain"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Capital Loss ($)</label>
                  <input type="number" name="capital-loss" value={formData["capital-loss"]} onChange={handleInputChange} className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
              </div>
            </div>

          </div>

          <button 
            onClick={predict}
            disabled={loading}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <span>⚡ Predict Donor Potential</span>}
          </button>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-200 mb-6">
            <button className="px-1 py-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600">Prediction Results</button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Outcome Card */}
          <div className={`bg-white rounded-xl shadow-sm border ${result ? (result.prediction === 1 ? 'border-t-4 border-t-emerald-500 border-x-slate-200 border-b-slate-200' : 'border-t-4 border-t-amber-500 border-x-slate-200 border-b-slate-200') : 'border-slate-200'} p-8 mb-6 flex justify-between items-center`}>
            
            <div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-2">PREDICTION OUTCOME</p>
              
              {!result ? (
                <>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-bold text-slate-300">Awaiting Input</h2>
                  </div>
                  <p className="text-slate-500 mt-2">Click 'Predict Donor Potential' to evaluate this subject.</p>
                </>
              ) : result.prediction === 1 ? (
                <>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-bold text-emerald-500">Potential Donor</h2>
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-slate-600 mt-2">The model predicts this individual earns &gt; $50K annually.</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-bold text-amber-500">Not Likely Donor</h2>
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-slate-600 mt-2">The model predicts this individual earns ≤ $50K annually.</p>
                </>
              )}
            </div>

            {/* Circular Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="50" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="64" cy="64" r="50" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round"
                  className={!result ? 'text-slate-200' : (result.prediction === 1 ? 'text-emerald-500 transition-all duration-1000' : 'text-amber-500 transition-all duration-1000')} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">
                  {result ? (result.confidence * 100).toFixed(1) : "0.0"}%
                </span>
                <span className="text-xs text-slate-500">Confidence</span>
              </div>
            </div>

          </div>

          {/* Feature Importance Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-slate-900">Feature Importance</h3>
            </div>
            
            <div className="space-y-6">
              {(result ? result.feature_importances : [
                {name: "Capital Gain", value: 0},
                {name: "Age", value: 0},
                {name: "Education Num", value: 0},
                {name: "Hours per Week", value: 0}
              ]).map((fi: any) => (
                <div key={fi.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">{fi.name}</span>
                    <span className="text-purple-600 font-mono font-medium">{(fi.value).toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${fi.value * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER / STATUS BAR */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            <span className="font-bold text-emerald-600">Ready</span>
          </div>
          <span>Model: v2.4-Hybrid</span>
          <span>Built by Hazem</span>
        </div>
        <div>
          &copy; 2024 CharityML Enterprise. Powered by Predictive Insights.
        </div>
      </footer>

      {/* Global Scrollbar style for tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
}

export default App;
