
import React from 'react';
import { MapPin, Phone, ChevronRight } from 'lucide-react';
import { ResolvedDoctor } from '../types';

interface DoctorCardProps {
  doctor: ResolvedDoctor;
  onClick: (slug: string) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(doctor.slug);
  };

  return (
    <a 
      href={`#/doctor/${doctor.slug}`}
      onClick={handleClick}
      className="block bg-white rounded-[2rem] p-6 mb-4 apple-shadow apple-card-hover transition-all cursor-pointer group active:scale-[0.97]"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            {doctor.specialties[0]}
          </span>
          <h3 className="text-xl font-black text-[#1D1D1F] leading-[1.1] group-hover:text-blue-600 transition-colors truncate">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1.5 text-[#86868B] text-xs font-medium mt-1">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{doctor.cities[0]}</span>
          </div>
        </div>
        
        <div className="mt-1 bg-gray-50 p-2 rounded-full text-gray-300 group-hover:text-blue-500 transition-colors shrink-0">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-50 pt-4">
        <div className="flex items-center gap-3 text-[#1D1D1F] text-sm">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <Phone size={14} />
          </div>
          <span className="font-bold">{doctor.phones[0]}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {doctor.diseases.slice(0, 3).map((disease, idx) => (
          <span 
            key={idx} 
            className="bg-[#F5F5F7] text-[#1D1D1F] px-3 py-1 rounded-full text-[10px] font-bold tracking-tight border border-transparent group-hover:border-gray-200 transition-all"
          >
            {disease}
          </span>
        ))}
        {doctor.diseases.length > 3 && (
          <span className="text-[10px] font-bold text-[#86868B] flex items-center">
            +{doctor.diseases.length - 3} más
          </span>
        )}
      </div>
    </a>
  );
};

export default DoctorCard;
