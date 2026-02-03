
import React from 'react';
import { Heart, Baby, Sparkles, Activity, CheckCircle2, Search, AlertCircle } from 'lucide-react';
import { encyclopediaData } from '../encyclopedia';

interface EncyclopediaArticleProps {
  articleName: string;
}

const getIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('cardio')) return <Heart size={32} />;
  if (t.includes('pedia')) return <Baby size={32} />;
  if (t.includes('derma')) return <Sparkles size={32} />;
  return <Activity size={32} />;
};

const EncyclopediaArticle: React.FC<EncyclopediaArticleProps> = ({ articleName }) => {
  const article = encyclopediaData[articleName];

  if (!article) return <div className="py-20 text-center font-bold">Artículo no encontrado</div>;

  return (
    <div className="px-4 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
          {getIcon(article.title)}
        </div>
        <h1 className="text-4xl font-black text-[#1D1D1F] tracking-tight">{article.title}</h1>
        <p className="text-xl font-medium text-[#424245] leading-relaxed max-w-md mx-auto">
          {article.summary}
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50">
          <h2 className="text-sm font-black text-green-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity size={18} /> ¿Qué hacen?
          </h2>
          <ul className="space-y-6">
            {article.whatTheyDo.map((item, idx) => (
              <li key={idx} className="flex gap-4">
                <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-1" />
                <p className="text-[17px] font-medium text-[#1D1D1F] leading-snug">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Search size={18} /> ¿Cómo revisan?
          </h2>
          <ul className="space-y-6">
            {article.howTheyCheck.map((item, idx) => (
              <li key={idx} className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0 mt-2.5" />
                <p className="text-[17px] font-medium text-[#1D1D1F] leading-snug">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-[2.5rem] p-8 apple-shadow border border-gray-50">
          <h2 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertCircle size={18} /> ¿Cuándo acudir?
          </h2>
          <div className="flex flex-wrap gap-3">
            {article.whenToSee.map((item, idx) => (
              <span key={idx} className="px-5 py-3 bg-orange-50 text-orange-700 rounded-2xl text-[15px] font-bold border border-orange-100">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="pt-10 pb-20 text-center">
        <a 
          href={`#/especialidad/${encodeURIComponent(article.title)}`}
          className="inline-flex h-16 px-10 bg-[#1D1D1F] text-white rounded-[1.5rem] items-center justify-center font-black text-lg active:scale-95 transition-all shadow-xl shadow-gray-200"
        >
          Encontrar {article.title}s
        </a>
      </div>
    </div>
  );
};

export default EncyclopediaArticle;
