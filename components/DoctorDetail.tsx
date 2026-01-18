
import React, { useMemo, useState } from 'react';
import { MapPin, Phone, Award, ExternalLink, ShieldCheck, Calendar, MessageCircle, Share2, CheckCircle2, UserCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { ResolvedDoctor } from '../types';
import { doctors, resolveDoctor } from '../data';
import DoctorCard from './DoctorCard';

interface DoctorDetailProps {
  doctor: ResolvedDoctor;
  onBack: () => void;
  onDoctorClick: (slug: string) => void;
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor, onBack, onDoctorClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${doctor.name} - ${doctor.specialties[0]}`,
          text: `Consulta el perfil del ${doctor.name}, especialista en ${doctor.specialties.join(', ')} en ${doctor.cities[0]}.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const bioParagraphs = useMemo(() => {
    const specialtiesStr = doctor.specialties.join(' y ');
    const citiesStr = doctor.cities.join(' y ');
    const diseasesStr = doctor.diseases.length > 4 
      ? doctor.diseases.slice(0, 4).join(', ') + ' e ' + doctor.diseases[4]
      : doctor.diseases.join(', ');
    const locationsStr = doctor.locations.map(l => l.name).join(' y ');
    
    return [
      <>
        El <strong>{doctor.name}</strong> es un especialista en <strong>{specialtiesStr}</strong> con amplia experiencia en el diagnóstico y tratamiento de condiciones como <strong>{diseasesStr}</strong>. Su práctica se enfoca en brindar soluciones médicas efectivas mediante protocolos de vanguardia y atención personalizada.
      </>,
      <>
        Actualmente, ofrece consulta profesional en <strong>{locationsStr}</strong> dentro de la ciudad de <strong>{citiesStr}</strong>. Destaca por su ética médica y compromiso inquebrantable con la salud de sus pacientes, garantizando un servicio de alta calidad orientado a mejorar su bienestar integral.
      </>
    ];
  }, [doctor]);

  const faqs = useMemo(() => [
    {
      question: `¿Cómo puedo agendar una cita con ${doctor.name}?`,
      answer: `Para agendar una cita con ${doctor.name}, puede utilizar los números de contacto directo proporcionados en este perfil. Recomendamos llamar a la sede de ${doctor.cities[0]} o enviar un mensaje vía WhatsApp para confirmar la disponibilidad de horarios y realizar el registro de su consulta de manera inmediata.`
    },
    {
      question: `¿Qué enfermedades trata ${doctor.name} en ${doctor.cities[0]}?`,
      answer: `${doctor.name} cuenta con amplia experiencia en el diagnóstico y tratamiento integral de diversas condiciones médicas, especializándose particularmente en ${doctor.diseases.slice(0, 4).join(', ')}. Su práctica en ${doctor.cities[0]} utiliza tecnología avanzada para asegurar resultados clínicos óptimos.`
    },
    {
      question: `¿Dónde se encuentran los consultorios de ${doctor.name}?`,
      answer: `Actualmente, ${doctor.name} atiende a sus pacientes en ${doctor.locations.length} ubicaciones estratégicas: ${doctor.locations.map(l => l.name).join(' y ')}. Todos los consultorios cuentan con instalaciones modernas diseñadas para brindar una atención profesional y confortable.`
    },
    {
      question: `¿Cuál es la especialidad principal de ${doctor.name}?`,
      answer: `La especialidad principal de ${doctor.name} es ${doctor.specialties[0]}. Su formación académica y trayectoria profesional le permiten ofrecer un servicio de alta especialización en este campo, garantizando un manejo ético y actualizado de la salud de sus pacientes.`
    }
  ], [doctor]);

  const relatedDoctors = useMemo(() => {
    const allResolved = doctors.map(resolveDoctor);
    return allResolved
      .filter(d => d.id !== doctor.id)
      .filter(d => 
        d.specialties.some(s => doctor.specialties.includes(s)) ||
        d.cities.some(c => doctor.cities.includes(c))
      )
      .sort((a, b) => {
        const aMatchesSpecialty = a.specialties.some(s => doctor.specialties.includes(s));
        const bMatchesSpecialty = b.specialties.some(s => doctor.specialties.includes(s));
        if (aMatchesSpecialty && !bMatchesSpecialty) return -1;
        if (!aMatchesSpecialty && bMatchesSpecialty) return 1;
        return 0;
      })
      .slice(0, 3);
  }, [doctor]);

  return (
    <article className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-32">
      {/* Header Profile Section */}
      <header className="bg-white px-6 pt-10 pb-8 text-center sm:rounded-b-[3rem] apple-shadow border-b border-gray-100 relative">
        <button 
          onClick={handleShare}
          className="absolute top-6 right-6 p-3 rounded-full bg-gray-50 text-[#1D1D1F] active:scale-90 transition-all z-10"
          aria-label="Compartir perfil"
        >
          <Share2 size={20} />
        </button>

        <div className="flex items-center justify-center gap-2 mb-1 mt-4">
          <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight leading-tight">
            {doctor.name}
          </h1>
        </div>
        
        <p className="text-blue-600 font-extrabold uppercase tracking-[0.1em] text-xs mb-8">
          {doctor.specialties.join(' & ')}
        </p>

        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          <a 
            href={`tel:${doctor.phones[0]}`}
            className="flex-1 h-14 bg-[#1D1D1F] text-white rounded-[1.2rem] flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg"
            title={`Llamar al ${doctor.name}`}
          >
            <Phone size={18} strokeWidth={3} />
            <span>Llamar</span>
          </a>
          <a 
            href={`https://wa.me/${doctor.phones[0].replace(/\+/g, '')}`}
            className="flex-1 h-14 bg-white border border-gray-200 text-[#1D1D1F] rounded-[1.2rem] flex items-center justify-center gap-2 font-black transition-all active:scale-95 hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
            title={`Contactar por WhatsApp`}
          >
            <MessageCircle size={18} strokeWidth={3} className="text-green-500" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Profile Sections */}
      <div className="p-6 space-y-10">
        
        {/* About Section */}
        <section aria-labelledby="about-doctor">
          <h2 id="about-doctor" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Semblanza Profesional</h2>
          <div className="bg-white rounded-[2rem] p-8 apple-shadow border border-gray-50">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <UserCircle size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-[18px] text-[#1D1D1F]">Sobre el especialista</h3>
                <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Compromiso y Experiencia</p>
              </div>
            </div>
            <div className="space-y-4">
              {bioParagraphs.map((para, idx) => (
                <p key={idx} className="text-[16px] leading-[1.6] text-[#424245] font-medium text-justify">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Info Group */}
        <section aria-labelledby="professional-info">
          <h2 id="professional-info" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Información Profesional</h2>
          <div className="bg-white rounded-[2rem] overflow-hidden apple-shadow">
            <div className="p-6 space-y-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                    <Award size={24} />
                 </div>
                 <div className="space-y-1">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cédula Profesional</p>
                   <p className="text-[17px] font-bold text-[#1D1D1F]">{doctor.license}</p>
                 </div>
               </div>
               
               <div className="h-px bg-gray-50 w-full"></div>
               
               <div className="space-y-3">
                 <div className="flex items-center gap-2">
                   <ShieldCheck size={16} className="text-green-500" />
                   <p className="text-[11px] font-black text-green-600 uppercase tracking-widest">Especialista Verificado</p>
                 </div>
                 <p className="text-[15px] leading-relaxed text-[#1D1D1F]">
                   Este especialista ha pasado por un proceso de validación de identidad y credenciales profesionales para garantizar la máxima seguridad y confianza en su atención médica.
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Diseases Group - Moved specifically before FAQs and after Professional Info */}
        <section aria-labelledby="diseases-title">
          <h2 id="diseases-title" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Experiencia en Tratamientos</h2>
          <div className="flex flex-wrap gap-2 px-1">
            {doctor.diseases.map((d, idx) => (
              <span key={idx} className="px-5 py-3 bg-white text-[#1D1D1F] rounded-2xl text-[14px] font-bold apple-shadow border border-gray-100 transition-all hover:scale-105">
                {d}
              </span>
            ))}
          </div>
        </section>

        {/* Locations Group */}
        <section aria-labelledby="locations-title">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 id="locations-title" className="text-sm font-black text-[#86868B] uppercase tracking-widest">Consultorios</h2>
            <span className="text-[11px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-md">
              {doctor.locations.length} Sede{doctor.locations.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-4">
            {doctor.locations.map((loc, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-6 apple-shadow border border-white hover:border-blue-100 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-[1rem] flex items-center justify-center text-gray-400 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <address className="not-italic">
                      <h3 className="font-black text-[18px] text-[#1D1D1F] leading-tight">{loc.name}</h3>
                      <p className="text-[15px] font-medium text-[#86868B] leading-snug mt-1">{loc.address}</p>
                    </address>
                  </div>
                </div>
                <button 
                   onClick={() => window.open(loc.map_url, '_blank')}
                   className="w-full h-12 bg-[#F5F5F7] text-[#1D1D1F] rounded-2xl text-sm font-black flex items-center justify-center gap-2 active:bg-gray-200 transition-colors border border-gray-100"
                >
                  <ExternalLink size={16} />
                  Ver en Google Maps
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Related FAQs Section - SEO Optimized */}
        <section aria-labelledby="related-faqs">
          <h2 id="related-faqs" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Preguntas Frecuentes</h2>
          <div className="bg-white rounded-[2rem] apple-shadow border border-gray-50 overflow-hidden">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'border-t border-gray-50' : ''}`}>
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 active:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-blue-500 shrink-0" />
                    <h3 className="font-bold text-[16px] text-[#1D1D1F] leading-snug group-hover:text-blue-600 transition-colors">{faq.question}</h3>
                  </div>
                  <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-11 pb-6 animate-in slide-in-from-top-2 fade-in">
                    <p className="text-[15px] leading-relaxed text-[#86868B] font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Doctors Section */}
        {relatedDoctors.length > 0 && (
          <section aria-labelledby="related-doctors">
            <h2 id="related-doctors" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Otros Especialistas Recomendados</h2>
            <div className="space-y-4">
              {relatedDoctors.map(relDoc => (
                <DoctorCard key={relDoc.id} doctor={relDoc} onClick={onDoctorClick} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-40 sm:max-w-3xl sm:mx-auto">
        <button 
          onClick={() => window.location.href = `tel:${doctor.phones[0]}`}
          className="w-full h-16 bg-blue-600 text-white font-black text-lg rounded-[1.5rem] shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Calendar size={22} strokeWidth={3} />
          Agendar Cita Ahora
        </button>
      </div>
    </article>
  );
};

export default DoctorDetail;
