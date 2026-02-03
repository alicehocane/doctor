
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, X, Heart, Baby, Activity, Sparkles, Grid, Globe, ClipboardList } from 'lucide-react';

interface NotificationBannerProps {
  onNavigate: (path: string) => void;
}

interface DiscoveryItem {
  id: string;
  type: 'specialty' | 'city' | 'disease' | 'general' | 'index';
  title: string;
  message: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);

  const getCurrentPath = () => {
    return window.location.hash.replace(/^#\/?/, '') || '/';
  };

  const discoveryItems: DiscoveryItem[] = useMemo(() => [
    {
      id: 'loc-1',
      type: 'general',
      title: 'Ubicación Actual',
      message: 'Encuentra especialistas cerca de tu zona ahora.',
      path: '/',
      icon: <MapPin size={24} />,
      color: 'bg-blue-600'
    },
    {
      id: 'spec-cardio',
      type: 'specialty',
      title: 'Cardiología',
      message: 'Consulta a los mejores Cardiólogos de la red.',
      path: `especialidad/${encodeURIComponent('Cardiólogo')}`,
      icon: <Heart size={24} />,
      color: 'bg-red-500'
    },
    {
      id: 'spec-pedia',
      type: 'specialty',
      title: 'Pediatría',
      message: 'Agenda consulta con especialistas en salud infantil.',
      path: `especialidad/${encodeURIComponent('Pediatra')}`,
      icon: <Baby size={24} />,
      color: 'bg-purple-500'
    },
    {
      id: 'city-mty',
      type: 'city',
      title: 'Médicos en Monterrey',
      message: 'Explora la oferta médica más completa de la ciudad.',
      path: `ciudad/${encodeURIComponent('Monterrey')}`,
      icon: <MapPin size={24} />,
      color: 'bg-orange-500'
    },
    {
      id: 'dis-diabetes',
      type: 'disease',
      title: 'Control de Diabetes',
      message: 'Expertos en el tratamiento integral de la diabetes.',
      path: `enfermedad/${encodeURIComponent('Diabetólogo')}`,
      icon: <Activity size={24} />,
      color: 'bg-green-600'
    },
    {
      id: 'spec-derma',
      type: 'specialty',
      title: 'Dermatología',
      message: 'Cuida tu piel con especialistas certificados.',
      path: `especialidad/${encodeURIComponent('Dermatólogo')}`,
      icon: <Sparkles size={24} />,
      color: 'bg-pink-500'
    },
    {
      id: 'index-spec',
      type: 'index',
      title: 'Todas las Especialidades',
      message: 'Explora nuestro catálogo completo de ramas médicas.',
      path: 'especialidades',
      icon: <Grid size={24} />,
      color: 'bg-indigo-600'
    },
    {
      id: 'index-city',
      type: 'index',
      title: 'Directorio por Ciudad',
      message: 'Busca médicos en cualquier ciudad de la República.',
      path: 'ciudades',
      icon: <Globe size={24} />,
      color: 'bg-cyan-600'
    },
    {
      id: 'index-dis',
      type: 'index',
      title: 'Guía de Tratamientos',
      message: 'Encuentra soluciones específicas para tu salud.',
      path: 'enfermedades',
      icon: <ClipboardList size={24} />,
      color: 'bg-amber-500'
    }
  ], []);

  const currentItem = useMemo(() => {
    const currentPath = getCurrentPath();
    const availableItems = discoveryItems.filter(item => {
      const itemPath = item.path === '/' ? '' : item.path;
      const normalizedCurrent = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
      return itemPath !== normalizedCurrent;
    });

    if (availableItems.length === 0) return discoveryItems[0];
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return availableItems[randomIndex];
  }, [discoveryItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const shown = typeof window !== 'undefined' && window.sessionStorage ? sessionStorage.getItem(`banner_shown_${currentItem.id}`) : null;
        if (!shown) {
          setIsVisible(true);
          if (window.sessionStorage) {
            sessionStorage.setItem(`banner_shown_${currentItem.id}`, 'true');
          }
        }
      } catch (e) {
        setIsVisible(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentItem.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setDragX(diff);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 80) {
      dismiss();
    } else {
      setDragX(0);
    }
    startX.current = null;
  };

  const dismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 500);
  };

  const handleClick = () => {
    onNavigate(currentItem.path);
    dismiss();
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed top-4 left-0 right-0 z-[100] px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-40 opacity-0 pointer-events-none'
      }`}
      style={{ 
        transform: `translateY(${isVisible ? 0 : -32}px) translateX(${dragX}px)`,
        filter: `blur(${Math.abs(dragX) / 40}px)`
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        onClick={handleClick}
        className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl apple-shadow rounded-[2.2rem] p-4 flex items-center gap-4 border border-white/40 cursor-pointer active:scale-95 transition-all group overflow-hidden relative"
      >
        <div className={`absolute top-0 left-0 w-1.5 h-full ${currentItem.color} group-hover:w-2 transition-all duration-300`} />
        
        <div className={`w-12 h-12 ${currentItem.color} text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg animate-pulse-slow`}>
          {currentItem.icon}
        </div>
        
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex justify-between items-center mb-0.5">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 ${currentItem.color} rounded-full animate-ping`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${currentItem.color.replace('bg-', 'text-')}`}>
                Sugerencia
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-400">ahora</span>
          </div>
          <h3 className="text-[15px] font-black text-[#1D1D1F] leading-tight truncate">
            {currentItem.title}
          </h3>
          <p className="text-[13px] text-[#424245] font-medium leading-snug truncate">
            {currentItem.message}
          </p>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 active:scale-90 transition-all"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>
      
      <div className={`flex justify-center mt-2 transition-opacity duration-500 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationBanner;
