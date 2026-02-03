
import React from 'react';
import { BookOpen, ChevronRight, Heart, Baby, Sparkles, Activity } from 'lucide-react';
import { encyclopediaData } from '../encyclopedia';

interface EncyclopediaIndexProps {
  onSelect: (name: string) => void;
}

const getIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('cardio')) return <Heart size={24} />;
  if (t.includes('pedia')) return <Baby size={24} />;
  if (t.includes('derma')) return <Sparkles size={24} />;
  return <Activity size={24} />;
};

const EncyclopediaIndex: React.FC<EncyclopediaIndexProps> = ({ onSelect }) => {
  return (
    <div className="px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 text-center space-y-2">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-inner mb-4">
          <BookOpen size={32} />
        </div>
        <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Enciclopedia Médica</h2>
        <p className="text-[#86868B] font-medium max-w-xs mx-auto">Aprende sobre qué hace cada especialista de forma sencilla.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {Object.values(encyclopediaData).map((entry) => (
          <button
            key={entry.title}
            onClick={() => onSelect(entry.title)}
            className="bg-white apple-shadow rounded-[2rem] p-6 flex items-center justify-between group active:scale-[0.98] transition-all border border-transparent hover:border-green-100 text-left"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                {getIcon(entry.title)}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-[#1D1D1F]">{entry.title}</h3>
                <p className="text-sm text-[#86868B] font-medium line-clamp-1">{entry.summary}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-green-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EncyclopediaIndex;
