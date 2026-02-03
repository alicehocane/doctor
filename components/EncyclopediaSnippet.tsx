
import React, { useState } from 'react';
import { BookOpen, ChevronDown, CheckCircle2, Search, AlertCircle } from 'lucide-react';
import { encyclopediaData } from '../encyclopedia';

interface EncyclopediaSnippetProps {
  specialtyName: string;
}

const EncyclopediaSnippet: React.FC<EncyclopediaSnippetProps> = ({ specialtyName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const article = encyclopediaData[specialtyName];

  if (!article) return null;

  return (
    <div className="bg-green-50/40 border border-green-100 rounded-[2rem] overflow-hidden transition-all duration-500 apple-shadow">
      <div className="p-6">
        <div className="flex items-center gap-2 text-green-700 mb-3">
          <BookOpen size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">Aprende sobre esta especialidad</span>
        </div>
        
        <p className="text-[16px] font-bold text-[#1D1D1F] leading-relaxed">
          {article.summary}
        </p>

        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="mt-4 flex items-center gap-1.5 text-green-700 font-black text-sm hover:underline active:scale-95 transition-all"
          >
            Saber más sobre {article.title}s
            <ChevronDown size={16} />
          </button>
        ) : (
          <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-2">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-green-800/60 uppercase tracking-widest flex items-center gap-2 px-1">
                <CheckCircle2 size={14} /> ¿Qué hacen?
              </h3>
              <ul className="space-y-3 px-1">
                {article.whatTheyDo.map((item, idx) => (
                  <li key={idx} className="text-[15px] font-medium text-[#424245] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-blue-800/60 uppercase tracking-widest flex items-center gap-2 px-1">
                <Search size={14} /> ¿Cómo revisan?
              </h3>
              <ul className="space-y-3 px-1">
                {article.howTheyCheck.map((item, idx) => (
                  <li key={idx} className="text-[15px] font-medium text-[#424245] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-orange-800/60 uppercase tracking-widest flex items-center gap-2 px-1">
                <AlertCircle size={14} /> ¿Cuándo acudir?
              </h3>
              <ul className="space-y-3 px-1">
                {article.whenToSee.map((item, idx) => (
                  <li key={idx} className="text-[15px] font-medium text-[#424245] leading-snug">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => setIsExpanded(false)}
              className="mt-6 w-full py-3 bg-white border border-green-200 text-green-700 font-black text-sm rounded-xl active:scale-95 transition-all"
            >
              Contraer información
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncyclopediaSnippet;
