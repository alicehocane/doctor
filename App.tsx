
import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { ViewState } from './types.ts';
import { doctors, resolveDoctor, getDoctorBySlug, lookups } from './data.ts';
import Layout from './components/Layout.tsx';
import DoctorCard from './components/DoctorCard.tsx';
import Filters from './components/Filters.tsx';
import SpecialtyIndex from './components/SpecialtyIndex.tsx';
import CityIndex from './components/CityIndex.tsx';
import DiseaseIndex from './components/DiseaseIndex.tsx';
import SEO from './components/SEO.tsx';
import FAQ from './components/FAQ.tsx';
import PrivacyPage from './components/PrivacyPage.tsx';
import TermsPage from './components/TermsPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import LegalPage from './components/LegalPage.tsx';
import FAQPage from './components/FAQPage.tsx';
import NotificationBanner from './components/NotificationBanner.tsx';
import EncyclopediaIndex from './components/EncyclopediaIndex.tsx';
import EncyclopediaArticle from './components/EncyclopediaArticle.tsx';
import EncyclopediaSnippet from './components/EncyclopediaSnippet.tsx';
import HomeDashboard from './components/HomeDashboard.tsx';
import { Stethoscope, Loader2, Plus, Sparkles, MapPin, ChevronRight, Search } from 'lucide-react';
import { normalizeText } from './utils/text.ts';

const DoctorDetail = lazy(() => import('./components/DoctorDetail.tsx'));

const PAGE_SIZE = 4;

const App: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const getPath = () => {
    const h = window.location.hash;
    return h.replace(/^#\/?/, '');
  };

  const [view, setView] = useState<ViewState>(() => {
    const path = getPath();
    if (path.startsWith('doctor/')) return { type: 'detail', slug: path.replace('doctor/', '') };
    if (path === 'especialidades') return { type: 'specialties-index' };
    if (path.startsWith('especialidad/')) return { type: 'specialty-detail', specialtyName: decodeURIComponent(path.replace('especialidad/', '')) };
    if (path === 'ciudades') return { type: 'cities-index' };
    if (path.startsWith('ciudad/')) return { type: 'city-detail', cityName: decodeURIComponent(path.replace('ciudad/', '')) };
    if (path === 'enfermedades') return { type: 'diseases-index' };
    if (path.startsWith('enfermedad/')) return { type: 'disease-detail', diseaseName: decodeURIComponent(path.replace('enfermedad/', '')) };
    if (path === 'enciclopedia') return { type: 'encyclopedia-index' };
    if (path.startsWith('enciclopedia/')) return { type: 'encyclopedia-detail', articleName: decodeURIComponent(path.replace('enciclopedia/', '')) };
    if (path === 'privacidad') return { type: 'privacy' };
    if (path === 'terminos') return { type: 'terms' };
    if (path === 'contacto') return { type: 'contact' };
    if (path === 'legal') return { type: 'legal' };
    if (path === 'faq') return { type: 'faq-page' };
    
    if (path.startsWith('buscar/')) {
        const parts = path.split('/');
        return {
            type: 'list',
            filters: { 
                query: '', 
                specialty: parts[1] && parts[1] !== 'null' ? decodeURIComponent(parts[1]) : null, 
                city: parts[2] && parts[2] !== 'null' ? decodeURIComponent(parts[2]) : null, 
                disease: null 
            }
        };
    }

    return { 
      type: 'list', 
      filters: { query: '', specialty: null, city: null, disease: null } 
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      const path = getPath();
      setVisibleCount(PAGE_SIZE); 
      
      if (path.startsWith('doctor/')) {
        setView({ type: 'detail', slug: path.replace('doctor/', '') });
      } else if (path === 'especialidades') {
        setView({ type: 'specialties-index' });
      } else if (path.startsWith('especialidad/')) {
        setView({ type: 'specialty-detail', specialtyName: decodeURIComponent(path.replace('especialidad/', '')) });
      } else if (path === 'ciudades') {
        setView({ type: 'cities-index' });
      } else if (path.startsWith('ciudad/')) {
        setView({ type: 'city-detail', cityName: decodeURIComponent(path.replace('ciudad/', '')) });
      } else if (path === 'enfermedades') {
        setView({ type: 'diseases-index' });
      } else if (path.startsWith('enfermedad/')) {
        setView({ type: 'disease-detail', diseaseName: decodeURIComponent(path.replace('enfermedad/', '')) });
      } else if (path === 'enciclopedia') {
        setView({ type: 'encyclopedia-index' });
      } else if (path.startsWith('enciclopedia/')) {
        setView({ type: 'encyclopedia-detail', articleName: decodeURIComponent(path.replace('enciclopedia/', '')) });
      } else if (path === 'privacidad') {
        setView({ type: 'privacy' });
      } else if (path === 'terminos') {
        setView({ type: 'terms' });
      } else if (path === 'contacto') {
        setView({ type: 'contact' });
      } else if (path === 'legal') {
        setView({ type: 'legal' });
      } else if (path === 'faq') {
        setView({ type: 'faq-page' });
      } else if (path.startsWith('buscar/')) {
        const parts = path.split('/');
        setView({
            type: 'list',
            filters: { 
                query: '', 
                specialty: parts[1] && parts[1] !== 'null' ? decodeURIComponent(parts[1]) : null, 
                city: parts[2] && parts[2] !== 'null' ? decodeURIComponent(parts[2]) : null, 
                disease: null 
            }
        });
      } else if (path === '') {
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

  const handleNavigate = (path: string) => {
    window.location.hash = path.startsWith('/') ? `#${path}` : `#/${path}`;
  };

  const isFiltered = useMemo(() => {
    if (view.type !== 'list') return false;
    const f = view.filters;
    return !!(f.query.trim() || f.specialty || f.city || f.disease);
  }, [view]);

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
          doc.cities.some(c => normalizeText(c).includes(q)) ||
          doc.diseases.some(d => normalizeText(d).includes(q));
        const matchesSpecialty = !view.filters.specialty || doc.specialties.includes(view.filters.specialty);
        const matchesCity = !view.filters.city || doc.cities.includes(view.filters.city);
        const matchesDisease = !view.filters.disease || doc.diseases.includes(view.filters.disease);
        return matchesQuery && matchesSpecialty && matchesCity && matchesDisease;
      });
    }
    return [];
  }, [view]);

  const displayedDoctors = useMemo(() => {
    return filteredDoctors.slice(0, visibleCount);
  }, [filteredDoctors, visibleCount]);

  const viewTitle = useMemo(() => {
    if (view.type === 'detail') return 'Perfil Médico';
    if (view.type === 'specialties-index') return 'Especialidades';
    if (view.type === 'specialty-detail') return view.specialtyName;
    if (view.type === 'cities-index') return 'Ciudades';
    if (view.type === 'city-detail') return view.cityName;
    if (view.type === 'diseases-index') return 'Enfermedades';
    if (view.type === 'disease-detail') return view.diseaseName;
    if (view.type === 'encyclopedia-index') return 'Enciclopedia';
    if (view.type === 'encyclopedia-detail') return view.articleName;
    if (view.type === 'privacy') return 'Privacidad';
    if (view.type === 'terms') return 'Términos';
    if (view.type === 'contact') return 'Contacto';
    if (view.type === 'legal') return 'Legal';
    if (view.type === 'faq-page') return 'Preguntas Frecuentes';
    
    if (view.type === 'list' && isFiltered) {
        const parts = [];
        if (view.filters.specialty) parts.push(view.filters.specialty);
        if (view.filters.city) parts.push(`en ${view.filters.city}`);
        return parts.length > 0 ? parts.join(' ') : 'Resultados de Búsqueda';
    }
    
    return 'Directorio Médico';
  }, [view, isFiltered]);

  const handleDoctorClick = (slug: string) => {
    handleNavigate(`doctor/${slug}`);
  };

  const handleBack = () => {
    if (view.type === 'specialty-detail') handleNavigate('especialidades');
    else if (view.type === 'city-detail') handleNavigate('ciudades');
    else if (view.type === 'disease-detail') handleNavigate('enfermedades');
    else if (view.type === 'encyclopedia-detail') handleNavigate('enciclopedia');
    else handleNavigate('/');
  };

  const handleFilterChange = (newFilters: any) => {
    setVisibleCount(PAGE_SIZE);
    if (view.type === 'list') setView({ ...view, filters: newFilters });
  };

  const selectedDoctor = useMemo(() => view.type === 'detail' ? getDoctorBySlug(view.slug) : null, [view]);

  const relatedInterests = useMemo(() => {
    if (view.type !== 'city-detail') return [];
    const popularSpecs = ["Cardiólogo", "Pediatra", "Dermatólogo", "Ginecólogo", "Oftalmólogo", "Neurólogo"];
    return popularSpecs.slice(0, 6).map(spec => ({
      spec,
      city: view.cityName
    }));
  }, [view]);

  return (
    <Layout 
      onNavigate={handleNavigate}
      title={viewTitle}
      onBack={view.type !== 'list' ? handleBack : (isFiltered ? () => handleFilterChange({query: '', specialty: null, city: null, disease: null}) : undefined)}
    >
      <SEO title={viewTitle} description="Directorio Médico Especializado" canonicalPath={window.location.hash.replace('#', '')} />
      <NotificationBanner onNavigate={handleNavigate} />

      {view.type === 'list' && (
        <div className="animate-in fade-in duration-500 pb-32">
          <Filters currentFilters={view.filters} onFilterChange={handleFilterChange} />
          
          {!isFiltered ? (
            <HomeDashboard onNavigate={handleNavigate} onDoctorClick={handleDoctorClick} />
          ) : (
            <div className="px-4">
              <h2 className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Stethoscope size={16} strokeWidth={2.5} /> {filteredDoctors.length} Especialistas encontrados
              </h2>
              
              {displayedDoctors.length > 0 ? (
                <div className="space-y-4">
                  {displayedDoctors.map(doc => (
                    <DoctorCard 
                      key={doc.id} 
                      doctor={doc} 
                      onClick={handleDoctorClick} 
                    />
                  ))}
                  
                  {filteredDoctors.length > visibleCount && (
                    <button 
                      onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                      className="w-full py-5 mt-6 bg-white/60 backdrop-blur-md border border-gray-200 text-[#1D1D1F] font-black rounded-[2rem] flex items-center justify-center gap-2 hover:bg-white active:scale-[0.98] transition-all apple-shadow"
                    >
                      <Plus size={18} strokeWidth={3} className="text-blue-600" />
                      Cargar más especialistas
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-[2.5rem] apple-shadow p-10 mx-2 border border-gray-50">
                  <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Search size={40} />
                  </div>
                  <h3 className="text-xl font-black text-[#1D1D1F]">Sin coincidencias</h3>
                  <p className="text-[#86868B] mt-2 mb-8 font-medium">Prueba con otros términos de búsqueda o filtros.</p>
                  <button onClick={() => handleFilterChange({ query: '', specialty: null, city: null, disease: null })} className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl active:scale-95 transition-all">Limpiar todo</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {view.type === 'specialties-index' && <SpecialtyIndex onSelect={(n) => handleNavigate(`especialidad/${encodeURIComponent(n)}`)} />}
      {view.type === 'cities-index' && <CityIndex onSelect={(n) => handleNavigate(`ciudad/${encodeURIComponent(n)}`)} />}
      {view.type === 'diseases-index' && <DiseaseIndex onSelect={(n) => handleNavigate(`enfermedad/${encodeURIComponent(n)}`)} />}
      {view.type === 'encyclopedia-index' && <EncyclopediaIndex onSelect={(n) => handleNavigate(`enciclopedia/${encodeURIComponent(n)}`)} />}
      {view.type === 'encyclopedia-detail' && <EncyclopediaArticle articleName={view.articleName} />}
      {view.type === 'privacy' && <PrivacyPage />}
      {view.type === 'terms' && <TermsPage />}
      {view.type === 'contact' && <ContactPage />}
      {view.type === 'legal' && <LegalPage />}
      {view.type === 'faq-page' && <FAQPage />}

      {(view.type === 'specialty-detail' || view.type === 'city-detail' || view.type === 'disease-detail') && (
        <div className="px-4 pt-6 animate-in fade-in duration-500 pb-32">
          <div className="mb-8 px-1">
            <h2 className="text-3xl font-black text-[#1D1D1F] tracking-tight mb-2">{view.type === 'specialty-detail' ? view.specialtyName : view.type === 'city-detail' ? view.cityName : view.diseaseName}</h2>
            <p className="text-[#86868B] font-medium mb-6">Explora los {filteredDoctors.length} especialistas verificados en esta área.</p>
            {view.type === 'specialty-detail' && <EncyclopediaSnippet specialtyName={view.specialtyName} />}
          </div>
          
          <div className="space-y-4">
            {displayedDoctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onClick={handleDoctorClick} />)}
            {filteredDoctors.length > visibleCount && (
              <button 
                onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
                className="w-full py-5 mt-4 bg-white/60 backdrop-blur-md border border-gray-200 text-[#1D1D1F] font-black rounded-[2rem] flex items-center justify-center gap-2 active:scale-95 transition-all apple-shadow"
              >
                <Plus size={18} strokeWidth={3} className="text-blue-600" />
                Cargar más especialistas
              </button>
            )}
          </div>

          {view.type === 'city-detail' && relatedInterests.length > 0 && (
            <section className="mt-16 mb-12 animate-in fade-in duration-1000">
               <div className="flex items-center gap-2 mb-6 px-1">
                 <Sparkles size={20} className="text-blue-600" />
                 <h3 className="text-[20px] font-black text-[#1D1D1F] tracking-tight">Recomendaciones en {view.cityName}</h3>
               </div>
               <div className="grid grid-cols-2 gap-3 px-1">
                 {relatedInterests.map((interest, idx) => (
                   <button
                     key={`${interest.spec}-${idx}`}
                     onClick={() => handleNavigate(`buscar/${encodeURIComponent(interest.spec)}/${encodeURIComponent(interest.city)}`)}
                     className="bg-white apple-shadow rounded-[1.8rem] p-5 flex flex-col gap-3 border border-transparent hover:border-blue-100 active:scale-95 transition-all group text-left min-h-[140px]"
                   >
                     <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Stethoscope size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[14px] font-bold text-[#1D1D1F] leading-tight mb-1">
                            {interest.spec}
                        </p>
                        <div className="flex items-center gap-1.5 text-[#86868B]">
                            <MapPin size={10} />
                            <span className="text-[10px] font-bold truncate">{interest.city}</span>
                        </div>
                     </div>
                     <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors ml-auto" />
                   </button>
                 ))}
               </div>
            </section>
          )}

          <FAQ specialtyName={view.type === 'specialty-detail' ? view.specialtyName : 'Especialista'} diseases={filteredDoctors.length > 0 ? Array.from(new Set(filteredDoctors.flatMap(d => d.diseases))).slice(0, 5) : lookups.diseases.slice(0, 5)} />
        </div>
      )}

      {view.type === 'detail' && (
        <Suspense fallback={<div className="flex justify-center py-40"><Loader2 className="animate-spin text-blue-600" size={48} /></div>}>
          {selectedDoctor ? <DoctorDetail doctor={selectedDoctor} onBack={handleBack} onDoctorClick={handleDoctorClick} onNavigate={handleNavigate} /> : null}
        </Suspense>
      )}
    </Layout>
  );
};

export default App;
