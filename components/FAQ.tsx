
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  specialtyName: string;
  diseases: string[];
}

const FAQ: React.FC<FAQProps> = ({ specialtyName, diseases }) => {
  const [isOpen, setIsOpen] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: `¿Qué trata un ${specialtyName}?`,
      answer: `Un ${specialtyName} es un médico especialista capacitado para diagnosticar y tratar una amplia variedad de condiciones médicas relacionadas con su área. En nuestro directorio, los especialistas en ${specialtyName} comúnmente atienden padecimientos como: ${diseases.join(', ')}.`
    },
    {
      question: `¿Cuándo debo acudir con un ${specialtyName}?`,
      answer: `Es recomendable programar una cita con un ${specialtyName} si presentas síntomas persistentes, si has sido referido por un médico general, o si requieres un seguimiento especializado para condiciones como ${diseases.slice(0, 3).join(' o ')}.`
    }
  ];

  return (
    <section className="mt-12 mb-8 bg-white apple-shadow rounded-[2rem] overflow-hidden border border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between group active:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <HelpCircle size={20} />
          </div>
          <h3 className="font-black text-[#1D1D1F] text-lg tracking-tight">Preguntas Frecuentes</h3>
        </div>
        <ChevronDown 
          size={24} 
          className={`text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
          {faqItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-bold text-[#1D1D1F] text-[16px]">{item.question}</h4>
              <p className="text-[#86868B] text-[15px] leading-relaxed font-medium">
                {item.answer}
              </p>
              {index < faqItems.length - 1 && <div className="h-px bg-gray-50 w-full mt-4" />}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQ;
