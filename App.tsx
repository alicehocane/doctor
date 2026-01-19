
import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { ViewState } from './types';
import { doctors, resolveDoctor, getDoctorBySlug, lookups } from './data';
import Layout from './components/Layout';
import DoctorCard from './components/DoctorCard';
import Filters from './components/Filters';
import SpecialtyIndex from './components/SpecialtyIndex';
import CityIndex from './components/CityIndex';
import DiseaseIndex from './components/DiseaseIndex';
import SEO from './components/SEO';
import FAQ from './components/FAQ';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import LegalPage from './components/LegalPage';
import FAQPage from './components/FAQPage';
import { Stethoscope, Grid, ChevronRight, Loader2, MapPin, Activity } from 'lucide-react';
import { normalizeText } from './utils/text';

const DoctorDetail = lazy(() => import('./components/DoctorDetail'));

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(() => {
    const hash = window.location.hash.replace('#/', '');
    if (hash.startsWith('doctor/')) {
      return { type: 'detail', slug: hash.replace('doctor/', '') };
    }
    if (hash === 'especialidades') return { type: 'specialties-index' };
    if (hash.startsWith('especialidad/')) return { type: 'specialty-detail', specialtyName: decodeURIComponent(hash.replace('especialidad/', '')) };
    if (hash === 'ciudades') return { type: 'cities-index' };
    if (hash.startsWith('ciudad/')) return { type: 'city-detail', cityName: decodeURIComponent(hash.replace('ciudad/', '')) };
    if (hash === 'enfermedades') return { type: 'diseases-index' };
    if (hash.startsWith('enfermedad/')) return { type: 'disease-detail', diseaseName: decodeURIComponent(hash.replace('enfermedad/', '')) };
    if (hash === 'privacidad') return { type: 'privacy' };
    if (hash === 'terminos') return { type: 'terms' };
    if (hash === 'contacto') return { type: 'contact' };
    if (hash === 'legal') return { type: 'legal' };
    if (hash === 'faq') return { type: 'faq-page' };
    
    return { 
      type: 'list', 
      filters: { query: '', specialty: null, city: null, disease: null } 
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash.startsWith('doctor/')) {
        setView({ type: 'detail', slug: hash.replace('doctor/', '') });
      } else if (hash === 'especialidades') {
        setView({ type: 'specialties-index' });
      } else if (hash.startsWith('especialidad/')) {
        setView({ type: 'specialty-detail', specialtyName: decodeURIComponent(hash.replace('especialidad/', '')) });
      } else if (hash === 'ciudades') {
        setView({ type: 'cities-index' });
      } else if (hash.startsWith('ciudad/')) {
        setView({ type: 'city-detail', cityName: decodeURIComponent(hash.replace('ciudad/', '')) });
      } else if (hash === 'enfermedades') {
        setView({ type: 'diseases-index' });
      } else if (hash.startsWith('enfermedad/')) {
        setView({ type: 'disease-detail', diseaseName: decodeURIComponent(hash.replace('enfermedad/', '')) });
      } else if (hash === 'privacidad') {
        setView({ type: 'privacy' });
      } else if (hash === 'terminos') {
        setView({ type: 'terms' });
      } else if (hash === 'contacto') {
        setView({ type: 'contact' });
      } else if (hash === 'legal') {
        setView({ type: 'legal' });
      } else if (hash === 'faq') {
        setView({ type: 'faq-page' });
      } else {
        setView({ 
          type: 'list', 
          filters: { query: '', specialty: null, city: null, disease: null } 
        });
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredDoctors = useMemo(() => {
    let baseDoctors = doctors.map((d, idx) => resolveDoctor(d, idx));

    if (view.type === 'specialty-detail') {
      return baseDoctors.filter(doc => doc.specialties.includes(view.specialtyName));
    }
    if (view.type === 'city-detail') {
      return baseDoctors.filter(doc => doc.cities.includes(view.cityName));
    }
    if (view.type === 'disease-detail') {
      return baseDoctors.filter(doc => doc.diseases.includes(view.diseaseName));
    }
    if (view.type === 'list') {
      const q = normalizeText(view.filters.query);
      return baseDoctors.filter(doc => {
        const matchesQuery = !q || 
          normalizeText(doc.name).includes(q) ||
          doc.specialties.some(s => normalizeText(s).includes(q)) ||
          doc.diseases.some(d => normalizeText(d).includes(q));
        const matchesSpecialty = !view.filters.specialty || doc.specialties.includes(view.filters.specialty);
        const matchesCity = !view.filters.city || doc.cities.includes(view.filters.city);
        const matchesDisease = !view.filters.disease || doc.diseases.includes(view.filters.disease);
        return matchesQuery && matchesSpecialty && matchesCity && matchesDisease;
      });
    }
    return [];
  }, [view]);

  const diseasesForContext = useMemo(() => {
    if (view.type === 'specialty-detail' || view.type === 'city-detail' || view.type === 'disease-detail') {
      const diseaseSet = new Set<string>();
      filteredDoctors.forEach(doc => doc.diseases.forEach(d => diseaseSet.add(d)));
      if (diseaseSet.size === 0) return lookups.diseases.slice(0, 5);
      return Array.from(diseaseSet);
    }
    return [];
  }, [view, filteredDoctors]);

  const handleDoctorClick = (slug: string) => {
    window.location.hash = `#/doctor/${slug}`;
  };

  const handleBack = () => {
    if (view.type === 'specialty-detail') window.location.hash = '#/especialidades';
    else if (view.type === 'city-detail') window.location.hash = '#/ciudades';
    else if (view.type === 'disease-detail') window.location.hash = '#/enfermedades';
    else window.location.hash = '#/';
  };

  const handleFilterChange = (newFilters: any) => {
    if (view.type === 'list') setView({ ...view, filters: newFilters });
  };

  const selectedDoctor = useMemo(() => view.type === 'detail' ? getDoctorBySlug(view.slug) : null, [view]);

  const canonicalPath = useMemo(() => {
    switch (view.type) {
      case 'detail': return `/doctor/${view.slug}`;
      case 'specialties-index': return `/especialidades`;
      case 'specialty-detail': return `/especialidad/${encodeURIComponent(view.specialtyName)}`;
      case 'cities-index': return `/ciudades`;
      case 'city-detail': return `/ciudad/${encodeURIComponent(view.cityName)}`;
      case 'diseases-index': return `/enfermedades`;
      case 'disease-detail': return `/enfermedad/${encodeURIComponent(view.diseaseName)}`;
      case 'privacy': return '/privacidad';
      case 'terms': return '/terminos';
      case 'contact': return '/contacto';
      case 'legal': return '/legal';
      case 'faq-page': return '/faq';
      default: return `/`;
    }
  }, [view]);

  return (
    <Layout 
      title={
        view.type === 'detail' ? 'Perfil Médico' : 
        view.type === 'specialties-index' ? 'Especialidades' :
        view.type === 'specialty-detail' ? view.specialtyName :
        view.type === 'cities-index' ? 'Ciudades' :
        view.type === 'city-detail' ? view.cityName :
        view.type === 'diseases-index' ? 'Enfermedades' :
        view.type === 'disease-detail' ? view.diseaseName :
        view.type === 'privacy' ? 'Privacidad' :
        view.type === 'terms' ? 'Términos' :
        view.type === 'contact' ? 'Contacto' :
        view.type === 'legal' ? 'Legal' :
        view.type === 'faq-page' ? 'Preguntas Frecuentes' :
        'Directorio Médico'
      } 
      onBack={view.type !== 'list' ? handleBack : undefined}
    >
      <SEO title={canonicalPath} description="Directorio Médico Especializado" canonicalPath={canonicalPath} />

      {view.type === 'list' && (
        <div className="animate-in fade-in duration-500">
          <Filters currentFilters={view.filters} onFilterChange={handleFilterChange} />
          {!view.filters.query && (
            <div className="px-4 space-y-4 mb-8">
              <a href="#/especialidades" className="block w-full bg-white apple-shadow rounded-[2rem] p-5 flex items-center justify-between group active:scale-[0.98] transition-all border border-transparent hover:border-blue-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Grid size={24} /></div>
                  <div className="text-left"><h3 className="font-black text-[17px] text-[#1D1D1F]">Por Especialidad</h3><p className="text-[13px] text-[#86868B] font-medium">Categorías médicas</p></div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a href="#/ciudades" className="block bg-white apple-shadow rounded-[2rem] p-5 flex flex-col gap-3 group active:scale-[0.98] transition-all border border-transparent hover:border-blue-50">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                  <div className="text-left"><h3 className="font-black text-[15px] text-[#1D1D1F]">Por Ciudad</h3><p className="text-[12px] text-[#86868B] font-medium">Ubicación</p></div>
                </a>
                <a href="#/enfermedades" className="block bg-white apple-shadow rounded-[2rem] p-5 flex flex-col gap-3 group active:scale-[0.98] transition-all border border-transparent hover:border-blue-50">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Activity size={20} /></div>
                  <div className="text-left"><h3 className="font-black text-[15px] text-[#1D1D1F]">Condiciones</h3><p className="text-[12px] text-[#86868B] font-medium">Tratamientos</p></div>
                </a>
              </div>
            </div>
          )}
          <div className="px-4">
            <h2 className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-4 flex items-center gap-2"><Stethoscope size={16} strokeWidth={2.5} /> {filteredDoctors.length} Especialistas</h2>
            {filteredDoctors.length > 0 ? (
              <div className="space-y-4">{filteredDoctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onClick={handleDoctorClick} />)}</div>
            ) : (
              <div className="py-20 text-center"><h3 className="text-xl font-black text-[#1D1D1F]">Sin resultados</h3><button onClick={() => handleFilterChange({ query: '', specialty: null, city: null, disease: null })} className="mt-4 text-blue-600 font-bold">Limpiar Filtros</button></div>
            )}
          </div>
        </div>
      )}

      {view.type === 'specialties-index' && <SpecialtyIndex onSelect={(n) => window.location.hash = `#/especialidad/${encodeURIComponent(n)}`} />}
      {view.type === 'cities-index' && <CityIndex onSelect={(n) => window.location.hash = `#/ciudad/${encodeURIComponent(n)}`} />}
      {view.type === 'diseases-index' && <DiseaseIndex onSelect={(n) => window.location.hash = `#/enfermedad/${encodeURIComponent(n)}`} />}
      {view.type === 'privacy' && <PrivacyPage />}
      {view.type === 'terms' && <TermsPage />}
      {view.type === 'contact' && <ContactPage />}
      {view.type === 'legal' && <LegalPage />}
      {view.type === 'faq-page' && <FAQPage />}

      {(view.type === 'specialty-detail' || view.type === 'city-detail' || view.type === 'disease-detail') && (
        <div className="px-4 pt-6 animate-in fade-in duration-500">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">{view.type === 'specialty-detail' ? view.specialtyName : view.type === 'city-detail' ? view.cityName : view.diseaseName}</h2>
            <p className="text-[#86868B] font-medium">{filteredDoctors.length} expertos encontrados.</p>
          </div>
          <div className="space-y-4">{filteredDoctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onClick={handleDoctorClick} />)}</div>
          <FAQ specialtyName={view.type === 'specialty-detail' ? view.specialtyName : 'Especialista'} diseases={diseasesForContext} />
        </div>
      )}

      {view.type === 'detail' && (
        <Suspense fallback={<div className="flex justify-center py-40"><Loader2 className="animate-spin text-blue-600" size={48} /></div>}>
          {selectedDoctor ? <DoctorDetail doctor={selectedDoctor} onBack={handleBack} onDoctorClick={handleDoctorClick} /> : null}
        </Suspense>
      )}
    </Layout>
  );
};

export default App;
