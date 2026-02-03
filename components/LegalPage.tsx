
import React from 'react';
import { Scale, AlertTriangle, ShieldCheck } from 'lucide-react';

const LegalPage: React.FC = () => {
  return (
    <div className="px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
          <Scale size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Aviso Legal</h2>
          <p className="text-[#86868B] font-medium text-sm">Información oficial y regulatoria.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50 space-y-10 text-[#424245] leading-relaxed">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-red-500" />
            <h3 className="text-xl font-black text-[#1D1D1F]">Limitación de Responsabilidad</h3>
          </div>
          <p className="text-[16px]">
            Directorio Médico S.A. de C.V. es una plataforma informativa que facilita el enlace entre pacientes y profesionales de la salud. Bajo ninguna circunstancia esta plataforma ofrece diagnósticos médicos, prescripción de fármacos o recomendaciones terapéuticas directas.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-blue-500" />
            <h3 className="text-lg font-black text-[#1D1D1F]">Propiedad Intelectual</h3>
          </div>
          <p>Todos los nombres comerciales, logotipos de hospitales y marcas registradas que aparecen en este directorio son propiedad de sus respectivos dueños. Su uso en este sitio es meramente identificativo y bajo principios de buena fe informativa.</p>
        </section>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-[#86868B] uppercase tracking-widest text-center">
            Ultima Revisión Legal: 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
