
import React from 'react';
import { ChevronLeft, FileCode } from 'lucide-react';
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

      {/* Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-0 sm:px-4">
        {children}
      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="w-full max-w-3xl mx-auto px-6 py-12 mt-12 border-t border-gray-200 text-[#86868B]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium">
            <button onClick={downloadSitemap} className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <FileCode size={12} />
              Generar Sitemap.xml
            </button>
            <a href="#/privacidad" className="hover:text-[#1D1D1F]">Privacidad</a>
            <a href="#/terminos" className="hover:text-[#1D1D1F]">Términos</a>
            <a href="#/contacto" className="hover:text-[#1D1D1F]">Contacto</a>
          </div>
          <div className="text-[11px] leading-relaxed">
            Copyright © 2024 Directorio Médico. Todos los derechos reservados. 
            Este es un directorio informativo; la verificación de cédula es responsabilidad del paciente.
          </div>
        </div>
      </footer>

      {/* Safety padding for iOS home indicator */}
      <div className="h-20 sm:h-0" />
    </div>
  );
};

export default Layout;
