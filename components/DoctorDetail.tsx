
import React, { useMemo, useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  UserCircle, 
  HelpCircle, 
  ChevronDown,
  ClipboardList,
  Pill,
  PenLine,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ResolvedDoctor } from '../types';
import { doctors, resolveDoctor, lookups } from '../data';
import DoctorCard from './DoctorCard';

interface DoctorDetailProps {
  doctor: ResolvedDoctor;
  onBack: () => void;
  onDoctorClick: (slug: string) => void;
  onNavigate: (path: string) => void;
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor, onBack, onDoctorClick, onNavigate }) => {
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
    
    const diseasesList = doctor.diseases;
    const diseasesStr = diseasesList.length > 3 
      ? `${diseasesList.slice(0, 3).join(', ')} y otras condiciones como ${diseasesList[3]}`
      : diseasesList.join(' y ');

    const locationsList = doctor.locations.map(l => l.name);
    const locationsStr = locationsList.length > 1 
        ? `${locationsList.slice(0, -1).join(', ')} y ${locationsList.slice(-1)}` 
        : locationsList[0];
    
    const focusStr = doctor.focus.length > 0 ? doctor.focus.join(', ') : null;
    
    return [
      <>
        Con una sólida trayectoria en el sector salud, el <strong>{doctor.name}</strong> se distingue como un profesional altamente calificado en <strong>{specialtiesStr}</strong>. Su práctica médica está respaldada por la cédula profesional <strong>{doctor.license}</strong>, lo que garantiza a sus pacientes una atención sujeta a los más altos estándares éticos, académicos y normativos vigentes en México.
      </>,
      <>
        Especializado en el manejo clínico de patologías de alta complejidad, el {doctor.name} cuenta con un historial destacado en el diagnóstico y tratamiento integral de <strong>{diseasesStr}</strong>. Su enfoque clínico se basa en la medicina de precisión{focusStr ? `, destacando su especial interés y experiencia en áreas como ${focusStr}` : ''}, lo que le permite diseñar planes de recuperación personalizados que se adaptan a la biología y necesidades específicas de cada individuo.
      </>,
      <>
        La presencia profesional del {doctor.name} en la zona de <strong>{citiesStr}</strong> se consolida a través de su labor en instituciones médicas de prestigio como <strong>{locationsStr}</strong>. En estas sedes, dispone de la infraestructura tecnológica y humana necesaria para realizar evaluaciones exhaustivas, asegurando que cada consulta sea un paso firme hacia el bienestar y la salud integral de quienes confían en su experiencia clínica.
      </>
    ];
  }, [doctor]);

  const faqs = useMemo(() => [
    {
      question: `¿Cómo puedo agendar una cita con ${doctor.name}?`,
      answer: `Para agendar una cita con el ${doctor.name}, puede utilizar los botones de contacto directo (Teléfono o WhatsApp) integrados en este perfil. Es recomendable tener a la mano su información básica para agilizar el registro en las sedes de ${doctor.locations.map(l => l.name).join(' o ')}.`
    },
    {
      question: `¿Qué enfermedades trata el ${doctor.name} en ${doctor.cities[0]}?`,
      answer: `El especialista cuenta con amplia experiencia en ${doctor.specialties[0]}, atendiendo particularmente casos de ${doctor.diseases.slice(0, 5).join(', ')}. Su práctica médica utiliza protocolos actualizados para asegurar los mejores resultados clínicos en cada tratamiento.`
    },
    {
      question: `¿Cuáles son las sedes de atención del ${doctor.name}?`,
      answer: `Actualmente, el ${doctor.name} ofrece consulta en ${doctor.locations.length} ubicaciones estratégicas: ${doctor.locations.map(l => l.name).join(' y ')}. Todos los consultorios están equipados con tecnología moderna para brindar una atención profesional y segura.`
    },
    {
      question: `¿Cuál es la formación del ${doctor.name}?`,
      answer: `El ${doctor.name} es un especialista certificado en ${doctor.specialties.join(' y ')}. Cuenta con la cédula profesional ${doctor.license}, lo que avala su formación académica superior y su autorización legal para ejercer la medicina especializada en el territorio nacional.`
    }
  ], [doctor]);

  const relatedDoctors = useMemo(() => {
    const allResolved = doctors.map((d, idx) => resolveDoctor(d, idx));
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

  const nearbyCities = useMemo(() => {
    return lookups.cities
      .filter(c => !doctor.cities.includes(c))
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [doctor.cities]);

  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    const scriptId = `faq-schema-${doctor.id}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (script) script.remove();

    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [doctor.id, faqs]);

  return (
    <article className="animate-in fade-in slide-in-from-bottom-8 duration-500 pb-40">
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
            className="flex-1 h-14 bg-[#1D1D1F] text-white rounded-[1.2rem] flex items-center justify-center gap-2 font-black transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <Phone size={18} strokeWidth={3} />
            <span>Llamar</span>
          </a>
          <a 
            href={`https://wa.me/${doctor.phones[0].replace(/\+/g, '')}`}
            className="flex-1 h-14 bg-white border border-gray-200 text-[#1D1D1F] rounded-[1.2rem] flex items-center justify-center gap-2 font-black transition-all active:scale-95 hover:bg-gray-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} strokeWidth={3} className="text-green-500" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      <div className="p-6 space-y-10">
        
        {/* About Section */}
        <section aria-labelledby="about-doctor">
          <h2 id="about-doctor" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Semblanza Profesional</h2>
          <div className="bg-white rounded-[2rem] p-8 apple-shadow border border-gray-50">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <UserCircle size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-[18px] text-[#1D1D1F]">Trayectoria Clínica</h3>
                <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Experiencia Verificada</p>
              </div>
            </div>
            <div className="space-y-6">
              {bioParagraphs.map((para, idx) => (
                <p key={idx} className="text-[16px] leading-[1.7] text-[#424245] font-medium text-justify">
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
                   Este perfil médico ha pasado por un proceso de validación de identidad y credenciales para asegurar la confianza y seguridad de los pacientes en la red.
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* Preparation Section */}
        <section aria-labelledby="prep-title">
          <h2 id="prep-title" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Preparación para su Cita</h2>
          <div className="bg-white rounded-[2rem] p-6 apple-shadow border border-gray-50">
            <h3 className="text-lg font-black text-[#1D1D1F] mb-6 flex items-center gap-2 px-2">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Calendar size={18} />
              </div>
              Cómo prepararse
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="w-10 h-10 bg-gray-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-blue-50">
                  <ClipboardList size={20} />
                </div>
                <p className="text-[15px] font-medium text-[#424245] leading-snug pt-1">
                  Traiga sus estudios médicos previos y resultados de laboratorio.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 bg-gray-50 text-purple-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-purple-50">
                  <Pill size={20} />
                </div>
                <p className="text-[15px] font-medium text-[#424245] leading-snug pt-1">
                  Haga una lista de los medicamentos que toma actualmente.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 bg-gray-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-orange-50">
                  <PenLine size={20} />
                </div>
                <p className="text-[15px] font-medium text-[#424245] leading-snug pt-1">
                  Anote sus síntomas y cuándo comenzaron.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 bg-gray-50 text-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-green-50">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-[15px] font-medium text-[#424245] leading-snug pt-1">
                  Confirme su cita con anticipación.
                </p>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 bg-gray-50 text-blue-400 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors group-hover:bg-blue-50">
                  <Clock size={20} />
                </div>
                <p className="text-[15px] font-medium text-[#424245] leading-snug pt-1">
                  Llegue unos minutos antes de la hora programada.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Diseases Group */}
        <section aria-labelledby="diseases-title">
          <h2 id="diseases-title" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Tratamientos y Condiciones</h2>
          <div className="flex flex-wrap gap-2 px-1">
            {doctor.diseases.map((d, idx) => (
              <span key={idx} className="px-5 py-3 bg-white text-[#1D1D1F] rounded-2xl text-[14px] font-bold apple-shadow border border-gray-100 transition-all hover:scale-105 active:bg-gray-50">
                {d}
              </span>
            ))}
          </div>
        </section>

        {/* Locations Group */}
        <section aria-labelledby="locations-title">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 id="locations-title" className="text-sm font-black text-[#86868B] uppercase tracking-widest">Sedes de Consulta</h2>
            <span className="text-[11px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-md">
              {doctor.locations.length} Ubicaciones
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
                  Ubicar en el Mapa
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Related FAQs Section - SEO Optimized */}
        <section aria-labelledby="related-faqs">
          <h2 id="related-faqs" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Atención al Paciente</h2>
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

        {/* Nearby Cities Section - Reubicado debajo de Atención al Paciente */}
        <section aria-labelledby="nearby-cities">
          <h2 id="nearby-cities" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Otras Localidades</h2>
          <div className="bg-white rounded-[2rem] p-6 apple-shadow border border-gray-50">
            <p className="text-[14px] text-[#86868B] font-medium mb-4 px-2">Explora especialistas en ciudades cercanas:</p>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((city) => (
                <a
                  key={city}
                  href={`#/ciudad/${encodeURIComponent(city)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`ciudad/${encodeURIComponent(city)}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-[#1D1D1F] rounded-full text-sm font-bold border border-transparent hover:border-blue-100 hover:bg-white active:scale-95 transition-all"
                >
                  <MapPin size={14} className="text-blue-500" />
                  {city}
                  <ArrowRight size={12} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Related Doctors Section */}
        {relatedDoctors.length > 0 && (
          <section aria-labelledby="related-doctors">
            <h2 id="related-doctors" className="text-sm font-black text-[#86868B] uppercase tracking-widest mb-4 px-1">Especialistas Similares</h2>
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
          Agendar Consulta Médica
        </button>
      </div>
    </article>
  );
};

export default DoctorDetail;
