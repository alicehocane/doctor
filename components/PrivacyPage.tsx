
import React from 'react';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
          <Shield size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Privacidad</h2>
          <p className="text-[#86868B] font-medium text-sm">Tu seguridad es nuestra prioridad.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50 space-y-10 text-[#424245] leading-relaxed">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-blue-500" />
            <h3 className="text-xl font-black text-[#1D1D1F]">Compromiso de Datos</h3>
          </div>
          <p className="text-[16px]">
            En <strong>Directorio Médico</strong>, nos tomamos muy en serio la protección de los datos personales. Esta política detalla cómo recopilamos, usamos y protegemos la información de los usuarios y profesionales de la salud que forman parte de nuestra red.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={18} className="text-blue-500" />
            <h3 className="text-lg font-black text-[#1D1D1F]">1. Recopilación de Información</h3>
          </div>
          <div className="pl-4 border-l-2 border-blue-50 space-y-3">
            <p><strong>Para Usuarios:</strong> No requerimos registro para navegar o buscar especialistas. No almacenamos historiales médicos personales.</p>
            <p><strong>Para Médicos:</strong> Recopilamos datos profesionales públicos (nombre, especialidad, cédula, dirección de consultorio y teléfonos de contacto) con el fin de facilitar el enlace con pacientes.</p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck size={18} className="text-blue-500" />
            <h3 className="text-lg font-black text-[#1D1D1F]">2. Uso de la Información</h3>
          </div>
          <p>La información mostrada tiene como único fin permitir que los pacientes encuentren y contacten a especialistas médicos de manera directa. No vendemos ni compartimos bases de datos con terceros para fines publicitarios ajenos a la salud.</p>
        </section>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-[#86868B] uppercase tracking-widest text-center">
            Última actualización: 24 de Mayo, 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
