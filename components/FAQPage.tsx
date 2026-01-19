
import React from 'react';
import { HelpCircle, Search, User, Phone, CheckCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: "¿Es gratuito el uso del directorio?",
      a: "Sí, para los pacientes el acceso y la consulta de la red de especialistas es totalmente gratuito. El directorio se financia mediante cuotas de mantenimiento profesional de los médicos listados.",
      icon: <CheckCircle className="text-green-500" size={20} />
    },
    {
      q: "¿Cómo verifican la cédula de los médicos?",
      a: "Realizamos una validación periódica contra la base de datos de Profesiones de la Secretaría de Educación Pública (SEP). Sin embargo, recomendamos siempre solicitar la cédula física durante la consulta.",
      icon: <User className="text-blue-500" size={20} />
    },
    {
      q: "¿Cómo puedo reportar información desactualizada?",
      a: "Puede enviarnos un mensaje vía WhatsApp o correo electrónico desde la sección de contacto. Nuestro equipo de soporte actualizará la ficha en menos de 24 horas.",
      icon: <Phone className="text-orange-500" size={20} />
    }
  ];

  return (
    <div className="px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
          <HelpCircle size={36} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight">Soporte</h2>
          <p className="text-[#86868B] font-medium text-sm">Preguntas Frecuentes y Ayuda.</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 apple-shadow border border-gray-50">
            <div className="flex items-center gap-3 mb-3 text-[#1D1D1F]">
              {faq.icon}
              <h3 className="font-black text-lg">{faq.q}</h3>
            </div>
            <p className="text-[#86868B] leading-relaxed text-[15px] pl-8">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
