
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { lookups } from '../data';

interface FiltersProps {
  onFilterChange: (filters: { 
    query: string; 
    specialty: string | null; 
    city: string | null; 
    disease: string | null 
  }) => void;
  currentFilters: { 
    query: string; 
    specialty: string | null; 
    city: string | null; 
    disease: string | null 
  };
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, currentFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...currentFilters, query: e.target.value });
  };

  const handleSelect = (key: 'specialty' | 'city' | 'disease', value: string | null) => {
    onFilterChange({ ...currentFilters, [key]: value === currentFilters[key] ? null : value });
  };

  const activeFiltersCount = 
    (currentFilters.specialty ? 1 : 0) + 
    (currentFilters.city ? 1 : 0) + 
    (currentFilters.disease ? 1 : 0);

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868B] pointer-events-none">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input 
          type="text"
          placeholder="Nombre, especialidad o ciudad"
          value={currentFilters.query}
          onChange={handleQueryChange}
          className="w-full h-14 pl-12 pr-12 bg-gray-200/50 border-none rounded-2xl text-[17px] font-medium placeholder:text-[#86868B] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
        />
        {currentFilters.query && (
          <button 
            onClick={() => onFilterChange({ ...currentFilters, query: '' })}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center hover:bg-gray-400"
          >
            <X size={14} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Filter Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 h-10 rounded-full text-sm font-bold transition-all shrink-0 ${
            isExpanded 
            ? 'bg-[#1D1D1F] text-white shadow-lg' 
            : 'bg-white text-[#1D1D1F] border border-gray-200 active:bg-gray-100'
          }`}
        >
          <SlidersHorizontal size={16} />
          {activeFiltersCount > 0 ? `Filtros (${activeFiltersCount})` : 'Filtrar'}
        </button>

        {currentFilters.specialty && (
          <button 
            onClick={() => handleSelect('specialty', null)}
            className="flex items-center gap-2 px-4 h-10 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 shrink-0"
          >
            {currentFilters.specialty} <X size={14} />
          </button>
        )}
        {currentFilters.city && (
          <button 
            onClick={() => handleSelect('city', null)}
            className="flex items-center gap-2 px-4 h-10 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 shrink-0"
          >
            {currentFilters.city} <X size={14} />
          </button>
        )}
        {currentFilters.disease && (
          <button 
            onClick={() => handleSelect('disease', null)}
            className="flex items-center gap-2 px-4 h-10 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 shrink-0"
          >
            {currentFilters.disease} <X size={14} />
          </button>
        )}
      </div>

      {/* Expanded iOS-style Filter Panel */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F7] animate-in fade-in slide-in-from-bottom-full duration-300 sm:relative sm:inset-auto sm:z-0 sm:rounded-3xl sm:border sm:border-gray-100 sm:shadow-2xl">
          <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 sm:rounded-t-3xl">
            <h3 className="text-lg font-black tracking-tight text-[#1D1D1F]">Filtros</h3>
            <button onClick={() => setIsExpanded(false)} className="text-blue-600 font-bold text-lg">Cerrar</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            <div>
              <label className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-4 block">Especialidad</label>
              <div className="grid grid-cols-2 gap-2">
                {lookups.specialties.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSelect('specialty', s)}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                      currentFilters.specialty === s 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-[#1D1D1F] border border-gray-100 active:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-4 block">Ciudad</label>
              <div className="flex flex-wrap gap-2">
                {lookups.cities.map(c => (
                  <button
                    key={c}
                    onClick={() => handleSelect('city', c)}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
                      currentFilters.city === c 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-[#1D1D1F] border border-gray-100 active:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-4 block">Condiciones</label>
              <div className="flex flex-wrap gap-2">
                {lookups.diseases.map(d => (
                  <button
                    key={d}
                    onClick={() => handleSelect('disease', d)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                      currentFilters.disease === d 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-[#86868B] border-gray-100 active:bg-gray-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-100 sm:rounded-b-3xl">
            <button 
              onClick={() => setIsExpanded(false)}
              className="w-full py-4 bg-[#1D1D1F] text-white font-black text-lg rounded-[1.5rem] active:scale-95 transition-all shadow-xl shadow-gray-200"
            >
              Mostrar {activeFiltersCount > 0 ? 'Resultados' : 'Todo'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
