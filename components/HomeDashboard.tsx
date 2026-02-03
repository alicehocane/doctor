
import React, { useMemo } from 'react';
import { ChevronRight, Grid, MapPin, Activity, BookOpen, Heart, Baby, Sparkles, Eye, Brain, User, Stethoscope, Search } from 'lucide-react';
import { lookups, doctors, resolveDoctor } from '../data';
import DoctorCard from './DoctorCard';

interface HomeDashboardProps {
  onNavigate: (path: string) => void;
  onDoctorClick: (slug: string) => void;
}

const specialtyIcons: Record<string, React.ReactNode> = {
  "Cardiólogo": <Heart size={20} />,
  "Pediatra": <Baby size={20} />,
  "Dermatólogo": <Sparkles size={20} />,
  "Ginecólogo": <User size={20} />,
  "Oftalmólogo": <Eye size={20} />,
  "Neurólogo": <Brain size={20} />,
  "Traumatólogo": <Activity size={20} />,
  "Nutriólogo": <Activity size={20} className="text-green-500" />,
};

const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate, onDoctorClick }) => {
  // 1. Get Popular Specialties (Top 8)
  const popularSpecialties = useMemo(() => {
    const counts: Record<string, number> = {};
    doctors.forEach(d => {
      d.s.forEach(sid => {
        const name = lookups.specialties[sid];
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(entry => entry[0]);
  }, []);

  // 2. Get Popular Cities (Top 6)
  const popularCities = useMemo(() => {
    const counts: Record<string, number> = {};
    doctors.forEach(d => {
      d.c.forEach(cid => {
        const name = lookups.cities[cid];
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(entry => entry[0]);
  }, []);

  // 3. Featured Section: Cardiologists in Monterrey
  const cardiologistsMonterrey = useMemo(() => {
    return doctors
      .map((d, idx) => resolveDoctor(d, idx))
      .filter(d => d.specialties.includes('Cardiólogo') && d.cities.includes('Monterrey'))
      .slice(0, 4);
  }, []);

  // 4. Featured Section: Pediatras in Generic
  const pediatriciansFeatured = useMemo(() => {
      return doctors
        .map((d, idx) => resolveDoctor(d, idx))
        .filter(d => d.specialties.includes('Pediatra'))
        .slice(0, 3);
  }, []);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 8 Big Specialisations */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight">Especialidades Populares</h2>
          <button onClick={() => onNavigate('especialidades')} className="text-blue-600 text-sm font-bold flex items-center gap-1 active:opacity-60 transition-opacity">
            Ver todas <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {popularSpecialties.map((spec) => (
            <button
              key={spec}
              onClick={() => onNavigate(`especialidad/${encodeURIComponent(spec)}`)}
              className="bg-white apple-shadow rounded-[1.5rem] p-4 flex flex-col items-center justify-center gap-2 group active:scale-95 transition-all border border-transparent hover:border-blue-50"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {specialtyIcons[spec] || <Stethoscope size={20} />}
              </div>
              <span className="text-[13px] font-bold text-[#1D1D1F] text-center leading-tight">{spec}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Cities Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight">Ciudades Principales</h2>
          <button onClick={() => onNavigate('ciudades')} className="text-blue-600 text-sm font-bold flex items-center gap-1 active:opacity-60 transition-opacity">
            Ver todas <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => onNavigate(`ciudad/${encodeURIComponent(city)}`)}
              className="bg-white apple-shadow rounded-2xl px-5 py-3 flex items-center gap-3 shrink-0 active:scale-95 transition-all border border-transparent hover:border-orange-100"
            >
              <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <span className="text-[14px] font-bold text-[#1D1D1F]">{city}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Encyclopedia Banner */}
      <section className="px-4">
        <button 
          onClick={() => onNavigate('enciclopedia')}
          className="w-full bg-gradient-to-br from-green-500 to-green-600 rounded-[2rem] p-6 text-white text-left relative overflow-hidden shadow-xl shadow-green-100 group active:scale-[0.98] transition-all"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-green-100 mb-1">
              <BookOpen size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Aprende con expertos</span>
            </div>
            <h3 className="text-xl font-black mb-1">Enciclopedia Médica</h3>
            <p className="text-[14px] text-green-50 font-medium max-w-[200px]">Guías sencillas sobre qué hace cada especialista.</p>
          </div>
          <div className="absolute right-[-10px] bottom-[-10px] opacity-20 group-hover:scale-110 transition-transform duration-700">
            <BookOpen size={120} />
          </div>
          <div className="absolute top-6 right-6">
            <ChevronRight size={24} className="text-white/40" />
          </div>
        </button>
      </section>

      {/* Featured Section 1: Cardiólogos en Monterrey */}
      {cardiologistsMonterrey.length > 0 && (
        <section className="px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight">Cardiólogos en Monterrey</h2>
              <p className="text-[13px] text-[#86868B] font-medium">Los mejores expertos del corazón en la ciudad.</p>
            </div>
          </div>
          <div className="space-y-4">
            {cardiologistsMonterrey.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} onClick={onDoctorClick} />
            ))}
            <button 
              onClick={() => onNavigate(`especialidad/${encodeURIComponent('Cardiólogo')}`)}
              className="w-full py-4 bg-gray-100 text-[#1D1D1F] font-black rounded-2xl text-sm active:scale-95 transition-all"
            >
              Explorar más Cardiólogos
            </button>
          </div>
        </section>
      )}

      {/* Featured Section 2: Pediatras */}
      {pediatriciansFeatured.length > 0 && (
        <section className="px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[20px] font-black text-[#1D1D1F] tracking-tight">Pediatras Recomendados</h2>
              <p className="text-[13px] text-[#86868B] font-medium">Cuidando el futuro, hoy mismo.</p>
            </div>
          </div>
          <div className="space-y-4">
            {pediatriciansFeatured.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} onClick={onDoctorClick} />
            ))}
          </div>
        </section>
      )}

      {/* Bottom Help Section */}
      <section className="px-4 pt-4">
        <div className="bg-white rounded-[2rem] p-6 apple-shadow border border-gray-50 flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
            <Search size={28} />
          </div>
          <div>
            <h4 className="font-black text-[16px] text-[#1D1D1F]">¿No encuentras lo que buscas?</h4>
            <p className="text-[13px] text-[#86868B] font-medium leading-snug">Usa el buscador arriba para filtrar por nombre o tratamiento específico.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeDashboard;
