
import React from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center shadow-inner mx-auto mb-4">
          <Mail size={40} />
        </div>
        <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Contacto</h2>
        <p className="text-[#86868B] font-medium max-w-xs mx-auto">
          ¿Eres médico y quieres aparecer en el directorio? ¿Necesitas soporte técnico? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <a 
          href="mailto:hola@directoriomedico.mx"
          className="bg-white rounded-[2rem] p-6 apple-shadow border border-transparent hover:border-blue-100 transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-0.5">Correo Electrónico</p>
              <p className="text-lg font-bold text-[#1D1D1F]">hola@directoriomedico.mx</p>
            </div>
          </div>
          <Send size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
        </a>

        <a 
          href="https://wa.me/528100000000"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-[2rem] p-6 apple-shadow border border-transparent hover:border-green-100 transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 rounded-2xl flex items-center justify-center transition-colors">
              <MessageCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-0.5">WhatsApp Soporte</p>
              <p className="text-lg font-bold text-[#1D1D1F]">+52 81 0000 0000</p>
            </div>
          </div>
          <ExternalLink size={20} className="text-gray-300 group-hover:text-green-500 transition-colors" />
        </a>

        <div className="bg-white rounded-[2rem] p-6 apple-shadow border border-gray-50 flex items-center gap-5">
          <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-0.5">Oficinas Centrales</p>
            <p className="text-lg font-bold text-[#1D1D1F]">Monterrey, Nuevo León, México</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white text-center space-y-4 shadow-xl shadow-blue-200">
        <h3 className="text-xl font-black">Registro de Especialistas</h3>
        <p className="text-blue-100 font-medium">Si eres un profesional de la salud verificado, únete a nuestra red hoy mismo.</p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-[1.2rem] font-black hover:bg-blue-50 active:scale-95 transition-all">
          Iniciar Registro
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
