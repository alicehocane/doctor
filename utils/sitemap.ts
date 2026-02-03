
import { doctors, lookups, resolveDoctor } from '../data';

export const generateSitemapXml = () => {
  const baseUrl = window.location.origin + window.location.pathname;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static Pages & Main Indices
  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '#/especialidades', priority: '0.8', changefreq: 'weekly' },
    { path: '#/ciudades', priority: '0.8', changefreq: 'weekly' },
    { path: '#/enfermedades', priority: '0.8', changefreq: 'weekly' },
    { path: '#/privacidad', priority: '0.3', changefreq: 'monthly' },
    { path: '#/terminos', priority: '0.3', changefreq: 'monthly' },
    { path: '#/contacto', priority: '0.5', changefreq: 'monthly' },
  ];

  pages.forEach(p => {
    xml += `  <url>\n    <loc>${baseUrl}${p.path}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
  });

  // Dynamic Specialty Pages
  lookups.specialties.forEach(s => {
    xml += `  <url>\n    <loc>${baseUrl}#/especialidad/${encodeURIComponent(s)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Dynamic City Pages
  lookups.cities.forEach(c => {
    xml += `  <url>\n    <loc>${baseUrl}#/ciudad/${encodeURIComponent(c)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Dynamic Disease Pages
  lookups.diseases.forEach(d => {
    xml += `  <url>\n    <loc>${baseUrl}#/enfermedad/${encodeURIComponent(d)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Doctor Profiles
  // Fixed: Resolved doctors to access 'slug' which is not present on the base Doctor type
  doctors.forEach((doctor, idx) => {
    const resolved = resolveDoctor(doctor, idx);
    xml += `  <url>\n    <loc>${baseUrl}#/doctor/${resolved.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

export const downloadSitemap = () => {
  const xml = generateSitemapXml();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
