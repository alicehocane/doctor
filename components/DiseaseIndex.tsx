
import React, { useState } from 'react';
import { Stethoscope, ChevronRight, Search } from 'lucide-react';
import { lookups } from '../data';
import { normalizeText } from '../utils/text';

interface DiseaseIndexProps {
  onSelect: (name: string) => void;
}

const DiseaseIndex: React.FC<DiseaseIndexProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = lookups.diseases.filter(d => 
    normalizeText(d).includes(normalizeText(searchTerm))
  );

  return (
    <div className="px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">Enfermedades</h2>
        <p className="text-[#86868B] font-medium">Busca expertos por condición o tratamiento.</p>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text"
          placeholder="Filtrar condiciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-white rounded-2xl border-none apple-shadow focus:ring-2 focus:ring-blue-100 outline-none font-medium text-sm"
        />
      </div>

      <ul className="space-y-3">
        {filteredDiseases.map((disease) => (
          <li key={disease}>
            <a
              href={`#/enfermedad/${encodeURIComponent(disease)}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(disease);
              }}
              className="block bg-white apple-shadow rounded-[1.2rem] p-4 flex items-center justify-between group active:scale-[0.99] transition-all border border-transparent hover:border-blue-50 text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <Stethoscope size={18} />
                </div>
                <span className="font-bold text-[#1D1D1F] text-md leading-tight flex-1">{disease}</span>
              </div>
              <ChevronRight size={18} className="text-gray-200 group-hover:text-blue-400 shrink-0 ml-2" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiseaseIndex;
