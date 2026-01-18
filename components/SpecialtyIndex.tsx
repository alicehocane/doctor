
import React from 'react';
import { Grid, ChevronRight, Activity, Heart, Baby, Brain, Eye, User, Sparkles } from 'lucide-react';
import { lookups } from '../data';

interface SpecialtyIndexProps {
  onSelect: (name: string) => void;
}

// Map some icons to common specialties for visual flair
const getSpecialtyIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('cardio')) return <Heart size={24} />;
  if (n.includes('pedia')) return <Baby size={24} />;
  if (n.includes('neuro')) return <Brain size={24} />;
  if (n.includes('oftalmo')) return <Eye size={24} />;
  if (n.includes('psiquia')) return <Brain size={24} className="opacity-50" />;
  if (n.includes('derma')) return <Sparkles size={24} />;
  if (n.includes('gineco')) return <User size={24} />;
  return <Activity size={24} />;
};

const SpecialtyIndex: React.FC<SpecialtyIndexProps> = ({ onSelect }) => {
  return (
    <div className="px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">Especialidades</h2>
        <p className="text-[#86868B] font-medium">Busca expertos por área médica.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lookups.specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => onSelect(specialty)}
            className="bg-white apple-shadow rounded-[1.5rem] p-5 flex items-center justify-between group active:scale-[0.98] transition-all border border-transparent hover:border-blue-100 text-left"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {getSpecialtyIcon(specialty)}
              </div>
              <span className="font-bold text-[#1D1D1F] text-lg leading-tight flex-1">{specialty}</span>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyIndex;
