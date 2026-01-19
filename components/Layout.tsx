
import React from 'react';
import { ChevronLeft, FileCode, Globe } from 'lucide-react';
import { downloadSitemap } from '../utils/sitemap';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* iOS-style Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-hidden">
            {onBack ? (
              <button 
                onClick={onBack}
                className="p-2 -ml-3 rounded-full hover:bg-black/5 transition-colors flex items-center gap-0.5 text-blue-600"
                aria-label="Volver"
              >
                <ChevronLeft size={24} />
                <span className="text-lg font-medium hidden sm:inline">Atrás</span>
              </button>
            ) : (
              <a href="#/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-200">
                  DM
                </div>
              </a>
            )}
            <h1 className={`text-lg font-bold tracking-tight truncate ${onBack ? 'ml-1' : 'ml-2'}`}>
              {title}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                Directorio
             </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-0 sm:px-4">
        {children}
      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="w-full bg-[#F5F5F7] text-[#86868B] pt-12 pb-20 px-6 sm:px-4 border-t border-[#D2D2D7]">
        <div className="max-w-3xl mx-auto">
          {/* Top: Breadcrumb path hint */}
          <div className="flex items-center gap-2 text-[12px] mb-8 font-medium">
             <a href="#/" className="hover:text-[#1D1D1F] transition-colors">Directorio Médico</a>
             <span className="text-gray-300">/</span>
             <span className="text-[#1D1D1F]">{title}</span>
          </div>

          {/* Main Footer Links - Columns */}
          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-4 mb-14">
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold text-[#1D1D1F] tracking-tight">Explorar</h4>
              <ul className="space-y-2 text-[12px] font-medium">
                <li><a href="#/" className="hover:underline hover:text-[#1D1D1F]">Directorio Inicio</a></li>
                <li><a href="#/especialidades" className="hover:underline hover:text-[#1D1D1F]">Todas las Especialidades</a></li>
                <li><a href="#/ciudades" className="hover:underline hover:text-[#1D1D1F]">Médicos por Ciudad</a></li>
                <li><a href="#/enfermedades" className="hover:underline hover:text-[#1D1D1F]">Tratamientos y Condiciones</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold text-[#1D1D1F] tracking-tight">Soporte</h4>
              <ul className="space-y-2 text-[12px] font-medium">
                <li><a href="#/faq" className="hover:underline hover:text-[#1D1D1F]">Preguntas Frecuentes</a></li>
                <li><a href="#/contacto" className="hover:underline hover:text-[#1D1D1F]">Contacto y Registro</a></li>
                <li><a href="#/legal" className="hover:underline hover:text-[#1D1D1F]">Aviso Legal</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[12px] font-bold text-[#1D1D1F] tracking-tight">Acerca de</h4>
              <ul className="space-y-2 text-[12px] font-medium">
                <li><a href="#/privacidad" className="hover:underline hover:text-[#1D1D1F]">Privacidad</a></li>
                <li><a href="#/terminos" className="hover:underline hover:text-[#1D1D1F]">Términos de Uso</a></li>
                <li className="pt-2">
                  <button 
                    onClick={downloadSitemap} 
                    className="flex items-center gap-2 px-3 py-1.5 bg-transparent border border-[#D2D2D7] hover:bg-white text-[#1D1D1F] rounded-full text-[11px] font-bold transition-all active:scale-95"
                  >
                    <FileCode size={12} className="text-blue-500" />
                    Sitemap XML
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* More ways to... hint */}
          <div className="text-[12px] mb-5 pb-5 border-b border-[#D2D2D7]">
            <p className="leading-relaxed">
              Otras formas de encontrar especialistas: <a href="#/ciudades" className="text-blue-600 hover:underline">busca una clínica cercana</a> o <a href="#/contacto" className="text-blue-600 hover:underline">llama al 800-DMEDICO</a>.
            </p>
          </div>

          {/* Bottom: Copyright & Region */}
          <div className="space-y-4">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[12px]">
                Copyright © 2025 Directorio Médico de México. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1D1D1F]">
                <Globe size={14} className="text-gray-400" />
                <span>México</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-[#424245]">
              <a href="#/privacidad" className="hover:underline pr-3 border-r border-gray-300 leading-none">Política de Privacidad</a>
              <a href="#/terminos" className="hover:underline pr-3 border-r border-gray-300 leading-none">Condiciones de Uso</a>
              <a href="#/legal" className="hover:underline pr-3 border-r border-gray-300 leading-none">Aviso Legal</a>
              <a href="#/contacto" className="hover:underline leading-none">Contacto</a>
            </div>

            <p className="text-[11px] leading-[1.6] text-[#86868B] max-w-2xl opacity-80">
              La información contenida en este sitio web es para fines informativos únicamente. Los logotipos, marcas y nombres de instituciones médicas son propiedad de sus respectivos dueños. El Directorio Médico no garantiza resultados específicos ni se hace responsable por la atención recibida.
            </p>
          </div>
        </div>
      </footer>

      {/* Safety padding for mobile browsers */}
      <div className="h-20 sm:h-0" />
    </div>
  );
};

export default Layout;
