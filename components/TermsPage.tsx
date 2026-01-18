
import React from 'react';
import { FileText, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
          <FileText size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Términos</h2>
          <p className="text-[#86868B] font-medium text-sm">Condiciones de uso de la plataforma.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50 space-y-8 text-[#424245] leading-relaxed">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale size={18} className="text-purple-500" />
            <h3 className="text-xl font-black text-[#1D1D1F]">Aceptación de Términos</h3>
          </div>
          <p className="text-[16px]">
            Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le sugerimos no utilizar nuestro servicio.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-orange-500" />
            <h3 className="text-lg font-black text-[#1D1D1F]">Naturaleza del Servicio</h3>
          </div>
          <p>
            <strong>Directorio Médico</strong> es una plataforma estrictamente informativa y de enlace. No somos una institución médica, no proporcionamos diagnósticos médicos y no empleamos a los profesionales listados.
          </p>
          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 flex gap-3 italic text-sm text-orange-800">
            <AlertCircle size={20} className="shrink-0" />
            <span>La verificación de la vigencia de la cédula profesional es responsabilidad última del paciente antes de cualquier procedimiento.</span>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-purple-500" />
            <h3 className="text-lg font-black text-[#1D1D1F]">Uso Permitido</h3>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-[15px]">
            <li>Búsqueda de especialistas para fines personales de salud.</li>
            <li>Contacto directo con los consultorios mediante los teléfonos proporcionados.</li>
            <li>No se permite el uso de datos para campañas de telemarketing o spam masivo.</li>
          </ul>
        </section>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs font-bold text-[#86868B] uppercase tracking-widest text-center">
            Vigente desde: Enero 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
