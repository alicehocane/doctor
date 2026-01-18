
import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { lookups } from '../data';

interface CityIndexProps {
  onSelect: (name: string) => void;
}

const CityIndex: React.FC<CityIndexProps> = ({ onSelect }) => {
  return (
    <div className="px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">Ciudades</h2>
        <p className="text-[#86868B] font-medium">Encuentra especialistas cerca de ti.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lookups.cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="bg-white apple-shadow rounded-[1.5rem] p-5 flex items-center justify-between group active:scale-[0.98] transition-all border border-transparent hover:border-blue-100 text-left"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin size={24} />
              </div>
              <span className="font-bold text-[#1D1D1F] text-lg leading-tight flex-1">{city}</span>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityIndex;
